export type MapType = "area" | "site" | "city" | "encounter";
export type MapSubType = "city" | "capital" | "shop" | "castle" | "ruins";
export type MapDescriptor = "small" | "medium" | "large" | "tavern" | "weapons" | "magic";

export const MAP_ICONS = {
    site: {
        shop: {
            tavern: "group_work"
        },
        ruins: "group_work"
    },
    city: {
        city: {
            small: "panorama_fish_eye",
            medium: "brightness_1",
            large: "radio_button_checked"
        },
        capital: {
            small: "star_border",
            medium: "star",
            large: "stars"
        }
    },
    encounter: "games"
};

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

    get icon(): string {
        let iconObject =  MAP_ICONS[this.type];
        if (this.subType) { iconObject = iconObject[this.subType]; }
        if (this.descriptor) { iconObject = iconObject[this.descriptor]; }
        return iconObject;
    }

    getWriteableStory(): Map {
        const writeable = { id: this.id };
        Map.WRITEABLE_FIELDS.forEach(field => writeable[field] = this[field]);
        return writeable as Map;
    }
}
