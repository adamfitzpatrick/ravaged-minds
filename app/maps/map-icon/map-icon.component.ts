import {Map} from "../map.model";

export class MapIconController {
    map: Map;

    getCoords(): Object {
        const left = this.map.x + "%";
        const top = this.map.y + "%";
        return { left: `calc(${left} - 9.5px)`, top: `calc(${top} - 9.5px)` };
    }
}
