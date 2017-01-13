/*import {MapService} from "../map.service";
import {City, MapItem, Map, Detail, Site, Encounter} from "../map.model";
import {StateService} from "../../services/state/state.service";
import * as throttle from "lodash.throttle";

export class MapController {
    mapId: number;
    map: Map;
    cities: City[];
    details: Detail[];
    sites: Site[];
    encounters: Encounter[];
    icons: Object;
    showLegend: boolean = true;
    zoom: number = 0;
    controlsOpen: boolean;
    mapPath: number[];
    onPathChange: (payload: { path: number[] }) => void;
    encounterView: Encounter;
    togglePlayerVisibleThrottled = throttle(this.togglePlayerVisible, 1000);
    togglePlayerClickableThrottled = throttle(this.togglePlayerClickable, 1000);

    constructor(
        private mapService: MapService,
        private stateService: StateService
    ) {
        this.icons = MapItem.ICONS;
    }

    $onInit(): void {
        this.mapService.get(this.mapId).then(this.loadMap);
        const state = this.stateService.getState("/maps");
        if (state && state.encounter) { this.showEncounter(state.encounter); }
    }

    gotoMap(mapId: number) {
        this.mapPath.push(mapId);
        this.onPathChange({ path: this.mapPath });
    }

    showEncounter(encounter: Encounter): void {
        let state = this.stateService.getState("/maps");
        if (state) {
            state.encounter = encounter;
        } else {
            state = { encounter: encounter };
        }
        this.stateService.setState("/maps", state);
        this.encounterView = encounter;
    }

    moveUpPath(): void {
        if (this.encounterView) {
            delete this.encounterView;
            return this.stateService.setState("/maps", { path: this.mapPath });
        }
        if (this.mapPath.length > 1) {
            this.mapPath.pop();
            this.onPathChange({ path: this.mapPath });
        }
    }

    getZoomLevel(): string {
        if (this.encounterView) { return "map__wrapper--encounter"; }
        return `map__wrapper--zoom-${this.zoom}`;
    }

    zoomIn(): void { this.zoom = Math.min(this.zoom + 1, 6); }

    zoomOut(): void { this.zoom = Math.max(this.zoom - 1, 0); }

    toggleLegend(): void { this.showLegend = !this.showLegend; }

    togglePlayerVisible(): void {
        this.map.playerVisible = !this.map.playerVisible;
        this.mapService.post(this.map);
    }

    togglePlayerClickable(): void {
        this.map.playerClick = !this.map.playerClick;
        this.mapService.post(this.map);
    }

    showControls = (): void => { this.controlsOpen = true; };

    hideControls(): void { this.controlsOpen = false; }

    getControlColor(active: boolean): Object {
        if (active) { return { background: "map_page-primary-A100" }; }
        return {};
    }

    get isControlOpen(): boolean { return this.controlsOpen; }

    set isControlOpen(value: boolean) {  }

    private loadMap = (map: Map) => {
        this.map = map;
        this.cities = map.cities;
        this.details = map.details;
        this.sites = map.sites;
        this.encounters = map.encounters;
    }
}*/
