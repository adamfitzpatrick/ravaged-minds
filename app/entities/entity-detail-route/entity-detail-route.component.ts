import {Entity} from "../entity.model";
import {EntityService} from "../entity.service";

interface EntityDetailRouteParams {
    entityId: string;
}

export class EntityDetailRouteController {
    entityId: number;
    entity: Entity;

    constructor(
        $routeParams: EntityDetailRouteParams,
        private entityService: EntityService
    ) {
        this.entityId = parseInt($routeParams.entityId, 10);
    }

    $onInit(): void {
        this.entityService.get(this.entityId).then(this.loadEntity);
    }

    private loadEntity = (entity: Entity): void => {
        this.entity = entity;
    }
}
