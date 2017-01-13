import {Story} from "../story.model";
import {StoryService} from "../story.service";
import {Entity} from "../../entities/entity.model";
import {EntityService} from "../../entities/entity.service";
import {StateService} from "../../services/state/state.service";
import {STORY_NAV_PATH} from "../stories/stories.component";
import * as throttle from "lodash.throttle";
import {MapService} from "../../maps/map.service";
import {Map} from "../../maps/map.model";

interface StoryDetailRouteParams {
    storyId: string;
}
export class StoryDetailController {
    id: number;
    story: Story;
    entities: Entity[];
    maps: Map[];
    storyContent: string;
    nextStatus = throttle(this.nextStatusOpen, 1000);
    oldStatus: { complete: boolean, success: boolean };

    constructor(
        private $sce: angular.ISCEService,
        private storyService: StoryService,
        private entityService: EntityService,
        private stateService: StateService,
        private mapService: MapService,
        $routeParams: StoryDetailRouteParams
    ) {
       this.id = parseInt($routeParams.storyId, 10);
       this.stateService.setState(STORY_NAV_PATH, { storyId: this.id });
    }

    $onInit(): void {
        this.storyService.get(this.id).then(this.loadStory);
    }

    private nextStatusOpen(): void {
        this.oldStatus = {
            complete: this.story.complete,
            success: this.story.success
        };
        if (this.story.complete && this.story.success) {
            this.story.success = false;
        } else if (this.story.complete) {
            this.story.complete = false;
        } else {
            this.story.complete = true;
            this.story.success = true;
        }
        this.storyService.post(this.story).then(this.onStatusChange);
    }

    private loadStory = (story: Story) => {
        this.story = story;
        this.storyContent = this.$sce.trustAsHtml(this.story.content);
        this.entityService.get(this.story.entities).then(this.loadEntities);
        if (this.story.maps && this.story.maps.length > 0) {
            this.mapService.get(this.story.maps).then(this.loadMaps);
        }
    }

    private loadEntities = (entities: Entity[]): void => { this.entities = entities; };

    private loadMaps = (maps: Map[]): void => { this.maps = maps; };

    private onStatusChange = (response: { status: number}): void => {
        if (response.status < 400) {
            delete this.oldStatus;
        } else {
            this.story.complete = this.oldStatus.complete;
            this.story.success = this.oldStatus.success;
        }
    }
}
