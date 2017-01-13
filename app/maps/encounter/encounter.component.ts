import {EntityService} from "../../entities/entity.service";
import {Entity} from "../../entities/entity.model";
import {StateService} from "../../services/state/state.service";
import {Combatant} from "../../combat/combatant.model";
import {Map} from "../map.model";

export class EncounterController {
    encounter: Map;
    entities: Entity[];

    constructor(
        private entityService: EntityService,
        private stateService: StateService,
        private $location: angular.ILocationService
    ) {}

    $onInit(): void {
        this.entityService.get(this.encounter.entities).then(this.loadEntities);
    }

    startCombat(): void {
        const combatants = this.getEncounterEntities().map(this.makeCombatant);
        const state = {
            combatants,
            selectedCombatantIndex: void 0,
            turnCombatantIndex: 0,
            round: 1
        };
        this.stateService.setState("/combat", state);
        this.$location.path("/combat");
    }

    getEncounterEntities() {
        if (!this.entities) { return; }
        return this.encounter.entities.map(entityId => {
            return this.entities.filter(entity => entity.id === entityId)[0];
        });
    }

    private makeCombatant(entity: Entity): Combatant {
        const uniqueName = entity.uniqueName || entity.name;
        const combatantObj = {
            name: uniqueName,
            entity,
            hitPoints: entity.fixedHitPoints,
            dexterity: entity.dexterity,
            engaged: true
        } as Combatant;
        return new Combatant(combatantObj);
    }

    private loadEntities = (entities: Entity[]) => { this.entities = entities; };
}
