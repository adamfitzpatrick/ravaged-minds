import { Story, StoryStatus } from "../story.model";
import {StoryService} from "../story.service";
import {Entity} from "../../entities/entity.model";
import {EntityService} from "../../entities/entity.service";
import {MapService} from "../../maps/map.service";
import {Map} from "../../maps/map.model";
import { AppStateService } from "../../app-state/app-state.service";

interface StoryDetailRouteParams {
    storyId: string;
}

export class StoryDetailController {
    id: number;
    story: Story;
    entities: Entity[];
    maps: Map[];
    storyContent: string;
    savingStatus: boolean;

    constructor(
        private $sce: angular.ISCEService,
        private storyService: StoryService,
        private entityService: EntityService,
        private mapService: MapService,
        private appStateService: AppStateService,
        $routeParams: StoryDetailRouteParams
    ) {
       this.id = parseInt($routeParams.storyId, 10);
    }

    $onInit(): void { this.storyService.get(this.id).then(this.loadStory); }

    hasStatus(status: StoryStatus): boolean { return this.story && this.story.status === status; }

    saveStatus(): void {
        this.savingStatus = true;
        this.nextStatus();
        this.storyService.post(this.story).then(this.onStatusChange);
    }

    private nextStatus(): void {
        if (this.hasStatus("incomplete")) {
            this.story.complete = true;
            this.story.success = true;
        } else if (this.hasStatus("success")) {
            this.story.complete = true;
            this.story.success = false;
        } else {
            this.story.complete = false;
        }
    }

    private loadStory = (story: Story) => {
        this.story = story;
        this.appStateService.dispatchAddSubRoute("story", story.id);
        this.storyContent = this.$sce.trustAsHtml(this.story.content);
        this.entityService.get(this.story.entities).then(this.loadEntities);
        if (this.story.maps && this.story.maps.length > 0) {
            this.mapService.get(this.story.maps).then(this.loadMaps);
        }
    }

    private loadEntities = (entities: Entity[]): void => { this.entities = entities; };

    private loadMaps = (maps: Map[]): void => { this.maps = maps; };

    private onStatusChange = (response: { status: number}): void => {
        this.savingStatus = false;
        if (response.status >= 400) {
            this.nextStatus();
            this.nextStatus();
        }
    }
}
