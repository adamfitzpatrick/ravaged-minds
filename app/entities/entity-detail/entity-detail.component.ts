import {Entity} from "../entity.model";
import * as throttle from "lodash.throttle";
import {EntityService} from "../entity.service";

export class EntityDetailController {
    entity: Entity;
    togglePlayerVisibleThrottled = throttle(this.togglePlayerVisible, 1000);

    constructor(
        private entityService: EntityService,
        private $sce: angular.ISCEService
    ) {}

    togglePlayerVisible(): void {
        this.entity.playerVisible = !this.entity.playerVisible;
        this.entityService.post(this.entity);
    }

    getDescription(markup: string) { return this.$sce.trustAsHtml(markup); }
}
