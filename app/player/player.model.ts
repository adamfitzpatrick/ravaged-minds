export class Player {
    name: string;
    conditions: string[];
    xp: number;

    constructor(player: Player) {
        this.name = player.name;
        this.conditions = player.conditions;
        this.xp = player.xp;
    }
}
