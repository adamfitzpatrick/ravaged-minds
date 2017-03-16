import * as angular from "angular";
import {Entity} from "../entity.model";
import {EntityService} from "../entity.service";
import { NavService } from "../../nav/nav.service";

interface EntitiesState {
    entityId: string;
}

export class EntitiesController {
    entities: Entity[];
    nameSearch: string;

    constructor(
        private entityService: EntityService,
        private navService: NavService
    ) {}

    $onInit(): void {
        this.entityService.get().then(this.loadEntities);
    }

    getName(entity: Entity): string { return entity.name.replace(/^the /i, ""); }

    gotoEntity(entity: Entity): void { this.navService.gotoSubRoute("entities", entity.id); }

    get filteredEntities(): Entity[] {
        const pattern = new RegExp(this.nameSearch, "gi");
        if (!this.nameSearch || !this.nameSearch.length) { return this.entities; }
        return this.entities.filter(entity => pattern.test(entity.name));
    }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities;
    }
}
