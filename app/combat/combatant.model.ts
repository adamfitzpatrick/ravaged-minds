export interface CombatantCondition { name: string; duration: number | string; }

export class Combatant {
    name: string;
    initiative: number;
    hitPoints?: number | number[];
    dexterity: number;
    armorClass: number;
    conditions: CombatantCondition[] | CombatantCondition[][];
    player: boolean;
    engaged: boolean;
    created: number;

    constructor(combatant: Combatant) {
        this.name = combatant.name;
        this.initiative = combatant.initiative;
        this.hitPoints = combatant.hitPoints;
        this.dexterity = combatant.dexterity;
        this.armorClass = combatant.armorClass;
        this.conditions = combatant.conditions || [];
        this.player = combatant.player;
        this.engaged = combatant.engaged;
        this.created = new Date().getTime() - new Date("1/1/2017").getTime();
    }

    get dexMod(): string { return (this.dexModValue() > 0 ? "+" : "") + this.dexModValue(); }

    get combatOrder(): number {
        return this.initiative + 0.1 * this.dexModValue() + 0.001 * (this.dexterity || 0) + 1e-16 * this.created;
    }

    matchesCombatOrder(turn: number): boolean {
        return Math.abs(turn - this.combatOrder) < 1e-16;
    }

    private dexModValue(): number {
        let dexterity = this.dexterity;
        if (this.dexterity % 2 === 0) { dexterity++; }
        return dexterity - (Math.floor(dexterity / 2) + 6) || 0;
    }
}
