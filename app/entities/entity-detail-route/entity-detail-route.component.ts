import {Entity} from "../entity.model";
import {EntityService} from "../entity.service";
import {StateService} from "../../services/state/state.service";

interface EntityDetailRouteParams {
    entityId: string;
}

export class EntityDetailRouteController {
    entityId: number;
    entity: Entity;

    constructor(
        $routeParams: EntityDetailRouteParams,
        private entityService: EntityService,
        private stateService: StateService
    ) {
        this.entityId = parseInt($routeParams.entityId, 10);
    }

    $onInit(): void {
        this.entityService.get(this.entityId).then(this.loadEntity);
        this.stateService.setState("/entities", { entityId: this.entityId });
    }

    private loadEntity = (entity: Entity): void => {
        this.entity = entity;
    }
}
