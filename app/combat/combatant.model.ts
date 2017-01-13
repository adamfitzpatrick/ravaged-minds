import {Entity} from "../entities/entity.model";

export interface CombatantCondition { name: string; duration: number; }

export class Combatant {
    name: string;
    clazz?: string;
    entity?: Entity;
    initiative: number;
    hitPoints?: number;
    dexterity: number;
    conditions: CombatantCondition[];
    player: boolean;
    engaged: boolean;

    constructor(combatant: Combatant) {
        this.name = combatant.name;
        this.clazz = combatant.clazz;
        this.entity = combatant.entity;
        this.initiative = combatant.initiative;
        this.hitPoints = combatant.hitPoints;
        this.dexterity = combatant.dexterity;
        this.conditions = combatant.conditions;
        this.player = combatant.player;
        this.engaged = combatant.engaged;
    }

    get dexMod(): string {
        let dexterity = this.dexterity;
        if (this.dexterity % 2 === 0) { dexterity++; }
        const mod = dexterity - (Math.floor(dexterity / 2) + 6);
        return (mod > 0 ? "+" : "") + mod;
    }

    get combatOrder(): string {
        return `${this.initiative}.${this.dexMod}.${this.dexterity}`;
    }
}
