import {EntityService} from "../../entities/entity.service";
import {Entity} from "../../entities/entity.model";
import {Combatant} from "../../combat/combatant.model";
import {Map} from "../map.model";

export class EncounterController {
    encounter: Map;
    entities: Entity[];

    constructor(
        private entityService: EntityService,
        private $location: angular.ILocationService
    ) {}

    $onInit(): void {
        if (this.encounter.entities) { this.entityService.get(this.encounter.entities).then(this.loadEntities); }
    }

    startCombat(): void {
        const combatants = this.getEncounterEntities().map(this.makeCombatant);
        const state = {
            combatants,
            selectedCombatantIndex: void 0,
            turnCombatantIndex: 0,
            round: 1
        };
        this.$location.path("/combat");
    }

    getEncounterEntities() {
        if (!this.entities) { return; }
        return this.encounter.entities.map(entityId => {
            return this.entities.filter(entity => entity.id === entityId)[0];
        });
    }

    private makeCombatant(entity: Entity): Combatant {
        const uniqueName = entity.name;
        const combatantObj = {
            name: uniqueName,
            hitPoints: entity.fixedHitPoints,
            dexterity: entity.dexterity,
            engaged: true
        } as Combatant;
        return new Combatant(combatantObj);
    }

    private loadEntities = (entities: Entity[]) => { this.entities = entities; };
}
