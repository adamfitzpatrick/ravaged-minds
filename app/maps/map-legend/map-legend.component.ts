import {MapIcon, MAP_ICONS} from "../map-icon/map-icon.model";
export class MapLegendController {
    topLevel: string;
    icon: MapIcon;

    $onInit(): void {
        const matches = MAP_ICONS.filter(icons => icons.name === this.topLevel);
        this.icon = matches && matches[0];
    }
}
