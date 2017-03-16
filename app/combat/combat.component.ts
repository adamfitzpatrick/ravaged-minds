import {Combatant} from "./combatant.model";
import {Entity} from "../entities/entity.model";
import {EntityService} from "../entities/entity.service";

export class CombatController {
    entities: Entity[];
    controlOpen: boolean = false;
    combatants: Combatant[] = [];
    selectedCombatantIndex: number;
    turnCombatantIndex: number = 0;
    round: number = 1;

    constructor(
        private entityService: EntityService
    ) {
        entityService.get().then(this.loadEntities);
    }

    get isControlOpen(): boolean { return this.controlOpen; }

    set isControlOpen(value) { /* not used */ }

    showControls(): void { this.controlOpen = true; }

    hideControls(): void { this.controlOpen = false; }

    addCombatant(): void {
        this.combatants.push(new Combatant({ engaged: true } as Combatant));
        this.saveState();
    }

    togglePlayer(combatant: Combatant): void { combatant.player = !combatant.player; }

    setSelectedCombatant(combatantIndex: number): void {
        this.selectedCombatantIndex = combatantIndex;
        this.saveState();
    }

    isCombatantSelected(combatantIndex: number): boolean {
        return this.selectedCombatantIndex === combatantIndex;
    }

    isCombatantTurn(combatantIndex: number): boolean {
        return this.turnCombatantIndex === combatantIndex;
    }

    deleteSelectedCombatant(): void {
        this.combatants.splice(this.selectedCombatantIndex, 1);
        this.saveState();
    }

    showEntity(combatant: Combatant): boolean {
        const index = this.combatants.indexOf(combatant);
        return this.isCombatantSelected(index) && !combatant.player && !!combatant.entity;
    }

    nextTurn(): void {
        if (this.turnCombatantIndex < this.combatants.length - 1) {
            this.turnCombatantIndex++;
        } else {
            this.turnCombatantIndex = 0;
            this.round++;
        }
        if (!this.combatants[this.turnCombatantIndex].engaged) { this.nextTurn(); }
        this.saveState();
    }

    lastTurn(): void {
        if (this.turnCombatantIndex > 0) {
            this.turnCombatantIndex--;
        } else if (this.round > 1) {
            this.turnCombatantIndex = this.combatants.length - 1;
            this.round--;
        }
        if (!this.combatants[this.turnCombatantIndex].engaged) { this.lastTurn(); }
        this.saveState();
    }

    resetCombat(): void {
        this.combatants = [];
        this.round = 1;
        delete this.selectedCombatantIndex;
        delete this.turnCombatantIndex;
    }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities.sort((a: Entity, b: Entity) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0;
        });
    }

    private saveState(): void {
        const state = {
            combatants: this.combatants,
            selectedCombatantIndex: this.selectedCombatantIndex,
            turnCombatantIndex: this.turnCombatantIndex,
            round: this.round
        };
    }
}
