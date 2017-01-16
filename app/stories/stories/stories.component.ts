import * as angular from "angular";
import {Story} from "../story.model";
import {StoryService} from "../story.service";
import {StateService} from "../../services/state/state.service";
import {PlayerAccessService} from "../../player-access/player-access.service";

interface ConnectionDiagram {
    from: number[];
    to: number[];
}

interface StoryControllerState {
    storyId: number;
}

export const STORY_NAV_PATH = "/story";

export class StoriesController {
    stories: Story[];
    sortedStories: Story[][];
    viewBrief: Story;
    left: boolean;
    nodes: HTMLElement[] = [];
    canvasContext: CanvasRenderingContext2D;

    constructor(
        private $element: angular.IAugmentedJQuery,
        private $window: angular.IWindowService,
        private $timeout: angular.ITimeoutService,
        private $location: angular.ILocationService,
        private storyService: StoryService,
        private stateService: StateService
    ) {}

    $onInit(): void {
        this.storyService.get().then(this.loadStories);
    }

    sortStories = (): void => {
        this.sortedStories = this.stories.sort(this.sortById)
            .reduce(this.makeStoryColumns, []);
    }

    connectNodes = (): void => {
        this.canvasContext.canvas.width = this.$element[0].offsetWidth;
        this.canvasContext.canvas.height = this.$element[0].offsetHeight;
        this.canvasContext
            .clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        this.nodes.forEach(this.calculateConnector);
    }

    showBrief= (id: number, left: boolean): void => {
        this.left = left;
        const filtered = this.stories.filter((story: Story) => story.id === id);
        this.viewBrief = filtered && filtered[0];
    }

    hideBrief(): void {
        delete this.viewBrief;
    }

    private loadStories = (stories: Story[]): void => {
        this.stories = stories;
        this.sortStories();
        this.$timeout(() => {
            this.getAllNodes();
            this.canvasContext = (this.$element.find("canvas")[0] as HTMLCanvasElement).getContext("2d");
            this.$window.onresize = this.connectNodes;
            this.connectNodes();
        }, 500);
        this.setState();
    }

    private setState = (): void => {
        const state = this.stateService.getState(STORY_NAV_PATH) as StoryControllerState;
        if (state && state.storyId) { this.$location.path(`/story/${state.storyId}`); }
    }

    private sortById(a: Story, b: Story): number {
        return a.id - b.id;
    }

    private makeStoryColumns = (sorter: Story[][], story: Story) => {
        if (!sorter[0]) {
            sorter.push([story]);
            return sorter;
        }
        if (this.storyIsInLastColumn(sorter, story)) {
            sorter[sorter.length] = [story];
        } else {
            sorter[sorter.length - 1].push(story);
        }
        return sorter;
    }

    private storyIsInLastColumn(sorter: Story[][], story: Story): boolean {
        const column = sorter[sorter.length - 1];
        const latest = story.from.sort()[story.from.length - 1];
        return column.some((node: Story) => {
            return node.id === latest;
        });
    }

    private getAllNodes(): void {
        const nodes = this.$element.find("story-node");
        /* tslint:disable:prefer-for-of */
        for (let k = 0; k < nodes.length; k++) {
            this.nodes.push(nodes[k]);
        }
        /* tslint:enable:prefer-for-of */
        this.nodes.sort(this.sortNodes);
    }

    private sortNodes(a: HTMLElement, b: HTMLElement): number {
        return parseInt(a.getAttribute("node-id"), 10) - parseInt(b.getAttribute("node-id"), 10);
    }

    private calculateConnector = (node: HTMLElement): void => {
        if (node.style.visibility === "hidden") { return; }
        const start = this.calculateCenter(node);
        const connections = this.getConnections(node);
        if (connections) {
            connections.forEach(successor => {
                if (successor.style.visibility === "hidden") { return; }
                const end = this.calculateCenter(successor);
                this.drawConnector(start, end);
            });
        }
    }

    private calculateCenter(node: HTMLElement): number[] {
        const left = node.offsetLeft + 0.5 * node.offsetWidth;
        const top = node.offsetTop + 0.5 * node.offsetHeight;
        return [left, top];
    }

    private getConnections = (node: HTMLElement): HTMLElement[] => {
        return this.findNodes(this.getConnectorIds(node).to);
    }

    private getConnectorIds(node: HTMLElement): ConnectionDiagram {
        const id = parseInt(node.getAttribute("node-id"), 10);
        const targetStory = this.stories.filter(story => story.id === id)[0];
        return { from: targetStory.from, to: targetStory.to };
    }

    private findNodes = (ids: number[]): HTMLElement[] => {
        if (!ids || !ids.length) { return; }
        return this.nodes.filter(node => {
            return ids.some(id => id === parseInt(node.getAttribute("node-id"), 10));
        });
    }

    private drawConnector = (start: number[], end: number[]): void => {
        this.canvasContext.lineWidth = 5;
        this.canvasContext.shadowOffsetX = 4;
        this.canvasContext.shadowOffsetY = 4;
        this.canvasContext.shadowBlur = 2;
        this.canvasContext.shadowColor = "rgba(0, 0, 0, 0.8)";
        this.canvasContext.strokeStyle = "rgba(0, 0, 0, 0.7)";
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(start[0], start[1]);
        this.canvasContext.lineTo(end[0], end[1]);
        this.canvasContext.stroke();
    }
}
