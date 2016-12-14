import * as angular from "angular";
import {StoryModel} from "./story.model";

interface ConnectionDiagram {
    from: number[];
    to: number[];
}

export class StoryController {
    stories: StoryModel[] = [new StoryModel({
        id: 1,
        major: true,
        activities: ["Sneak", "Persuade", "Fight", "Perform", "Railroad", "Puzzle"],
        to: [2, 3],
        title: "Our Hero",
        tagline: "In which something happens that our protagonist may find undesireable.",
        synopsis: `Mother died today. Or maybe yesterday, I don’t know. I had a telegram from the
        home: ‘Mother passed away. Funeral tomorrow. Yours sincerely.’ That doesn’t mean anything.
        It may have been yesterday.`,
        complete: true,
        success: true
    } as StoryModel), new StoryModel({
        id: 2,
        major: false,
        activities: ["Sneak", "Fight"],
        from: [1],
        to: [4],
        title: "Next Step",
        tagline: "In which something happens that our protagonist may find undesireable.",
        synopsis: `Mother died today. Or maybe yesterday, I don’t know. I had a telegram from the
        home: ‘Mother passed away. Funeral tomorrow. Yours sincerely.’ That doesn’t mean anything.
        It may have been yesterday.`,
        complete: false,
        success: true
    } as StoryModel), new StoryModel({
        id: 3,
        major: false,
        activities: ["Sneak"],
        from: [1],
        to: [4],
        title: "First Step",
        tagline: "In which something happens that our protagonist may find undesireable.",
        synopsis: `Mother died today. Or maybe yesterday, I don’t know. I had a telegram from the
        home: ‘Mother passed away. Funeral tomorrow. Yours sincerely.’ That doesn’t mean anything.
        It may have been yesterday.`,
        complete: true,
        success: false
    } as StoryModel), new StoryModel({
        id: 4,
        major: true,
        activities: ["Sneak"],
        from: [2, 3],
        title: "Onward",
        tagline: "In which something happens that our protagonist may find undesireable.",
        synopsis: `Mother died today. Or maybe yesterday, I don’t know. I had a telegram from the
        home: ‘Mother passed away. Funeral tomorrow. Yours sincerely.’ That doesn’t mean anything.
        It may have been yesterday.`,
        complete: true,
        success: true
    } as StoryModel)];
    sortedStories: StoryModel[][];
    viewBrief: StoryModel;
    left: boolean;
    nodes: HTMLElement[] = [];
    canvasContext: CanvasRenderingContext2D;

    //noinspection TsLint
    constructor(
        private $element: angular.IAugmentedJQuery,
        private $window: angular.IWindowService,
        private $timeout: angular.ITimeoutService
    ) {}

    $onInit(): void {
        this.sortStories();
        this.$timeout(() => {
            this.getAllNodes();
            this.canvasContext = (this.$element.find("canvas")[0] as HTMLCanvasElement).getContext("2d");
            this.$window.onresize = this.connectNodes;
            this.connectNodes();
        }, 1000);
    }

    sortStories(): void {
        this.sortedStories = this.stories.sort(this.sortById)
            .reduce(this.makeStoryColumns, []);
    }

    connectNodes = (): void => {
        this.canvasContext.canvas.width = this.$window.innerWidth;
        this.canvasContext.canvas.height = this.$window.innerHeight;
        this.canvasContext
            .clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        this.nodes.forEach(this.calculateConnector);
    }

    showBrief= (id: number, left: boolean): void => {
        this.left = left;
        const filtered = this.stories.filter((story: StoryModel) => story.id === id);
        this.viewBrief = filtered && filtered[0];
    }

    hideBrief(): void {
        delete this.viewBrief;
    }

    private sortById(a: StoryModel, b: StoryModel): number {
        return a.id - b.id;
    }

    private makeStoryColumns = (sorter: StoryModel[][], story: StoryModel) => {
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

    private storyIsInLastColumn(sorter: StoryModel[][], story: StoryModel): boolean {
        const column = sorter[sorter.length - 1];
        const latest = story.from.sort()[story.from.length - 1];
        return column.some((node: StoryModel) => {
            return node.id === latest;
        });
    }

    private getAllNodes(): void {
        const nodes = this.$element.find("story-node");
        for (let k = 0; k < nodes.length; k++) {
            this.nodes.push(nodes[k]);
        }
        this.nodes.sort(this.sortNodes);
    }

    private sortNodes(a: HTMLElement, b: HTMLElement): number {
        return parseInt(a.getAttribute("node-id"), 10) - parseInt(b.getAttribute("node-id"), 10);
    }

    private calculateConnector = (node: HTMLElement): void => {
        const start = this.calculateCenter(node);
        const connections = this.getConnections(node);
        if (connections) {
            connections.forEach(successor => {
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

    private getConnections = (node: HTMLElement) => {
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
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(start[0], start[1]);
        this.canvasContext.lineTo(end[0], end[1]);
        this.canvasContext.stroke();
    }
}
