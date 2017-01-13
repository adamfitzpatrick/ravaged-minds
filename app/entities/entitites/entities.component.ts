import * as angular from "angular";
import {Entity} from "../entity.model";
import {EntityService} from "../entity.service";
import {StateService} from "../../services/state/state.service";

interface EntitiesState {
    entityId: string;
}

export class EntitiesController {
    entities: Entity[];

    constructor(
        private entityService: EntityService,
        private stateService: StateService,
        private $location: angular.ILocationService
    ) {}

    $onInit(): void {
        const state = this.stateService.getState("/entities") as EntitiesState;
        if (state && state.entityId) {
            this.$location.path(`/entities/${state.entityId}`);
            return;
        }
        this.entityService.get().then(this.loadEntities);
    }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities;
    }
}
