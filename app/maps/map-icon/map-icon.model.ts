import {Map} from "../map.model";

export interface MapIcon {
    label?: boolean;
    name: string;
    icon?: string;
    subGroup?: MapIcon[];
}

export const MAP_ICONS: MapIcon[] = [{
    name: "site",
    subGroup: [{
        name: "shop",
        subGroup: [{
            label: true,
            name: "tavern",
            icon: "group_work"
        }]
    }]
}, {
    name: "area",
    subGroup: [{
        name: "ruins",
        label: true,
        icon: "group_work"
    }]
}, {
    name: "city",
    subGroup: [{
        label: true,
        name: "city",
        subGroup: [{
            label: true,
            name: "small",
            icon: "panorama_fish_eye"
        }, {
            label: true,
            name: "medium",
            icon: "brightness_1"
        }, {
            label: true,
            name: "large",
            icon: "radio_button_checked"
        }]
    }, {
        label: true,
        name: "capital",
        subGroup: [{
            label: true,
            name: "small",
            icon: "star_border"
        }, {
            label: true,
            name: "medium",
            icon: "star"
        }, {
            label: true,
            name: "large",
            icon: "stars"
        }]
    }]
}, {
    label: true,
    name: "encounter",
    icon: "games"
}];
