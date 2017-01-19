export type MapType = "area" | "site" | "city" | "encounter";
export type MapSubType = "city" | "capital" | "shop" | "castle" | "ruins";
export type MapDescriptor = "small" | "medium" | "large" | "tavern" | "weapons" | "magic";

export class Map {

    static WRITEABLE_FIELDS = [ "playerVisible", "playerClickable" ];

    id: number;
    name: string;
    type: MapType;
    subType?: MapSubType;
    descriptor?: MapDescriptor;
    x: number;
    y: number;
    imageUrl: string;
    playerVisible: boolean;
    playerClickable: boolean;
    maps?: number[];
    entities?: number[];
    description?: string;
    rewards?: string;
    xp?: number;

    constructor(map: Map) {
        this.id = map.id;
        this.name = map.name;
        this.type = map.type;
        this.subType = map.subType;
        this.descriptor = map.descriptor;
        this.x = map.x;
        this.y = map.y;
        this.imageUrl = map.imageUrl;
        this.playerVisible = map.playerVisible;
        this.playerClickable = map.playerClickable;
        this.maps = map.maps;
        this.entities = map.entities;
        this.description = map.description;
        this.rewards = map.rewards;
        this.xp = map.xp;
    }

    getWriteableStory(): Map {
        const writeable = { id: this.id };
        Map.WRITEABLE_FIELDS.forEach(field => writeable[field] = this[field]);
        return writeable as Map;
    }
}
