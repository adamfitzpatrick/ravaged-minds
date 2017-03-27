import { Combatant } from "../combatant.model";

export class CombatantController {
    combatant: Combatant;
    initiative: string;
    instance: number = 0;

    $onInit(): void {
        this.initiative = this.combatant.initiative && this.combatant.initiative.toString();
    }

    addInstance(): void {
        if (this.combatant.hitPoints && !(this.combatant.hitPoints as number[]).length) {
            this.combatant.hitPoints = [this.combatant.hitPoints as number];
        }
        (this.combatant.hitPoints as number[]).push(0);
        this.instance = (this.combatant.hitPoints as number[]).length - 1;
    }

    nextInstance() { if (this.instance < (this.combatant.hitPoints as number[]).length - 1) { this.instance++; } }

    prevInstance() { if (this.instance > 0) { this.instance++; } }

    setInstance(index: number) { this.instance = index; }

    isSelectedInstance(index: number) { return this.instance === index; }

    getInstanceDesignator(index: number) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")[index || this.instance]; }

    get instanceHitPoints(): number {
        if (typeof this.combatant.hitPoints !== "number") {
            return this.combatant.hitPoints && this.combatant.hitPoints[this.instance];
        }
        return this.combatant.hitPoints as number;
    }

    set instanceHitPoints(hitPoints: number) {
        if (this.combatant.hitPoints && (this.combatant.hitPoints as number[]).length) {
            this.combatant.hitPoints[this.instance] = hitPoints;
        } else {
            this.combatant.hitPoints = hitPoints;
        }
    }

    highHitPoints(): boolean { return this.combatant.hitPoints >= 100; }

    conditionTransformer($chip) {
        const chipArr = $chip.split(";");
        const duration = parseInt(chipArr[1], 10) || (chipArr[1] && chipArr[1].trim().toUpperCase()) || "P";
        return { name: chipArr[0], duration };
    }
}
