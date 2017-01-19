import * as angular from "angular";
import {Entity} from "../entity.model";
import {EntityService} from "../entity.service";
import {StateService} from "../../services/state/state.service";

interface EntitiesState {
    entityId: string;
}

export class EntitiesController {
    entities: Entity[];
    nameSearch: string;

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

    getName(entity: Entity): string { return entity.name.replace(/^the /i, ""); }

    get filteredEntities(): Entity[] {
        const pattern = new RegExp(this.nameSearch, "gi");
        if (!this.nameSearch || !this.nameSearch.length) { return this.entities; }
        return this.entities.filter(entity => pattern.test(entity.name));
    }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities;
    }
}
