import {Combatant} from "./combatant.model";
import {Entity} from "../entities/entity.model";
import {EntityService} from "../entities/entity.service";
import { AppStateService } from "../app-state/app-state.service";

const ACTIVE_COMBATANT_TOP = "calc(50vh - 200px - 108px)";
const ACTIVE_COMBATANT_LEFT = "calc(50vw - 200px)";
const TOP_CARD_LEFT = "80px";

export class CombatController {
    entities: Entity[];
    controlOpen: boolean = false;
    combatants: Combatant[] = [];
    round: number = 0;
    turn: number;
    topCard: Combatant;

    constructor(
        private entityService: EntityService,
        private appStateService: AppStateService
    ) {}

    $onInit(): void {
        this.entityService.get().then(this.loadEntities);
        /*this.combatants = this.appStateService.getCombat().combatants;
        this.turn = this.appStateService.getCombat().turn;
        this.round = this.appStateService.getCombat().round;*/
    }

    $onDestroy(): void {
        this.saveState();
    }

    get isControlOpen(): boolean { return this.controlOpen; }

    set isControlOpen(value) { /* not used */ }

    showControls(): void { this.controlOpen = true; }

    hideControls(): void { this.controlOpen = false; }

    showIntro(): boolean {
        if (!this.combatants || !this.combatants.length) {
            this.showControls();
            return true;
        }
        return false;
    }

    addCombatant(): void {
        const combatant = new Combatant({ engaged: true } as Combatant);
        this.combatants.push(combatant);
        this.setTopCard(combatant);
    }

    deleteSelectedCombatant(combatant: Combatant): void {
        const index = this.combatants.indexOf(combatant);
        this.combatants.splice(index, 1);
        this.saveState();
    }

    showEntity(combatant: Combatant): boolean {
        return false;
    }

    isActiveCombatant(combatant): boolean { return combatant.matchesCombatOrder(this.turn); }

    nextTurn(): void {
        this.turn = this.getNextOrderedCombatant().combatOrder;
        this.saveState();
    }

    lastTurn(): void {
        this.turn = this.getPrevOrderedCombatant().combatOrder;
        this.saveState();
    }

    resetCombat(): void {
        this.combatants = [];
        this.round = 1;
        this.saveState();
    }

    getCardPositioningStyle(combatant: Combatant): Object {
        const orderedCombatants = this.getOrderedCombatants();
        const combatOrder = orderedCombatants.indexOf(combatant);
        let zIndex = combatOrder;
        let left = "0px";
        let top = `${80 * combatOrder}px`;
        /*if (this.isActiveCombatant(combatant)) {
            top = ACTIVE_COMBATANT_TOP;
            left = ACTIVE_COMBATANT_LEFT;
            zIndex = 999;
            return;
        } else*/
        if (this.isTopCard(combatant)) {
            left = TOP_CARD_LEFT;
            zIndex = 100;
        }
        return {
            "top": top,
            "left": left,
            "z-index": zIndex
        };
    }

    getCombatantOrderIndex(combatant: Combatant): number {
        return this.getOrderedCombatants().indexOf(combatant);
    }

    getCombatantPlacementClass(combatant: Combatant): string {
        const combatOrder = this.getCombatantOrderIndex(combatant);
        let classStr = "";
        if (this.isTopCard(combatant)) { classStr += "combat__combatant--top"; }
        // if (this.isActiveCombatant(combatant)) { classStr += " combat__combatant--active"; }
        return `combat__combatant--${combatOrder} ${classStr}`;
    }

    setTopCard = (combatant: Combatant): void => {
        this.topCard = combatant;
    }

    isTopCard(combatant: Combatant): boolean { return combatant === this.topCard; }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities.sort((a: Entity, b: Entity) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0;
        });
    }

    private saveState(): void {
        this.appStateService.dispatchSetCombat(this.combatants, this.turn, this.round);
    }

    private getOrderedCombatants(): Combatant[] {
        return Object.assign([], this.combatants).sort((a: Combatant, b: Combatant) => b.combatOrder - a.combatOrder);
    }

    private getNextOrderedCombatant(): Combatant {
        const remainingCombatants =  this.getOrderedCombatants().filter(combatant => combatant.combatOrder < this.turn);
        if (remainingCombatants.length) {  return remainingCombatants[0]; }
        this.round++;
        return this.getOrderedCombatants()[0];
    }

    private getPrevOrderedCombatant(): Combatant {
        const previousCombatants = this.getOrderedCombatants().reverse()
            .filter(combatant => combatant.combatOrder > this.turn);
        if (previousCombatants.length) { return previousCombatants[0]; }
        this.round--;
        return this.getOrderedCombatants().reverse()[0];
    }
}
