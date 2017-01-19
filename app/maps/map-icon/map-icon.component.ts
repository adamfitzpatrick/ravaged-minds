import {Map} from "../map.model";
import {MapIcon, MAP_ICONS} from "./map-icon.model";

export class MapIconController {
    map: Map;

    getCoords(): Object {
        const left = this.map.x + "%";
        const top = this.map.y + "%";
        return { left: `calc(${left} - 9.5px)`, top: `calc(${top} - 9.5px)` };
    }

    get icon(): string {
        const typeGroup = this.findMapIcon(this.map.type, MAP_ICONS);
        const subTypeGroup = this.findMapIcon(this.map.subType, typeGroup && typeGroup.subGroup);
        const descriptorIcon =
            this.findMapIcon(this.map.descriptor, subTypeGroup && subTypeGroup.subGroup);
        return descriptorIcon.icon || subTypeGroup.icon || typeGroup.icon;
    }

    private findMapIcon(name: string, icons: MapIcon[]): MapIcon {
        if (!name || !icons) { return { name: "none" }; }
        const match = icons.filter(icon => icon.name === name);
        return match && match[0];
    }
}
