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
        name: "public",
        subGroup: [{
            label: true,
            name: "tavern",
            icon: "group_work"
        }, {
            label: true,
            name: "fairground",
            icon: "stars"
        }, {
            label: true,
            name: "market",
            icon: "monetization_on"
        }]
    }, {
        name: "private",
        subGroup: [{
            label: true,
            name: "home",
            icon: "home"
        }, {
            label: true,
            name: "business",
            icon: "business"
        }]
    }, {
        name: "holy",
        subGroup: [{
            label: true,
            name: "shrine",
            icon: "change_history"
        }, {
            label: true,
            name: "church",
            icon: "account_balance"
        }]
    }, {
        name: "government",
        subGroup: [{
            label: true,
            name: "castle",
            icon: "flag"
        }, {
            label: true,
            name: "barracks",
            icon: "security"
        }, {
            label: true,
            name: "gatehouse",
            icon: "block"
        }, {
            label: true,
            name: "secure area",
            icon: "games"
        }]
    }]
}, {
    name: "area",
    subGroup: [{
        name: "ruins",
        label: true,
        icon: "group_work"
    }, {
        name: "detail",
        label: true,
        icon: "zoom_in"
    }, {
        name: "fortress",
        label: true,
        icon: "flag"
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
