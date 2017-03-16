import {MapService} from "../map.service";
import {Map} from "../map.model";
import * as throttle from "lodash.throttle";
import { NavService } from "../../nav/nav.service";
import { AppStateService } from "../../app-state/app-state.service";
import { AppState } from "../../app-state/states";

interface MapData { map: Map; mapMaps: Map[]; }

interface MapRoute extends angular.route.IRoute {
    current: { locals: { mapData: MapData }};
}

const MAPS = "/maps";

export class MapController {
    map: Map;
    areas: Map[] = [];
    sites: Map[] = [];
    cities: Map[] = [];
    encounters: Map[] = [];
    showLegend: boolean = true;
    zoom: number = 0;
    controlsOpen: boolean;
    togglePlayerVisibleThrottled = throttle(this.togglePlayerVisible, 1000);
    togglePlayerClickableThrottled = throttle(this.togglePlayerClickable, 1000);

    constructor(
        private $route: MapRoute,
        private mapService: MapService,
        private appStateService: AppStateService,
        private navService: NavService
    ) {}

    $onInit(): void {
        this.map = this.$route.current.locals.mapData.map;
        this.loadMaps(this.$route.current.locals.mapData.mapMaps);
        this.appStateService.connect(this.stateListener, this);
    }

    gotoMap(mapId: number) { this.navService.gotoSubRoute("maps", mapId); }

    moveUpPath(): void { this.navService.gotoPrevSubRoute("maps"); }

    getZoomLevel(): string {
        if (this.map.type === "encounter") { return "map__wrapper--encounter"; }
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
        this.map.playerClickable = !this.map.playerClickable;
        this.mapService.post(this.map);
    }

    showControls = (): void => { this.controlsOpen = true; };

    hideControls(): void { this.controlsOpen = false; }

    getControlColor(active: boolean): Object {
        if (active) { return { background: "map_page-primary-A100" }; }
        return {};
    }

    get isControlOpen(): boolean { return this.controlsOpen; }

    set isControlOpen(value: boolean) { /* not used */ }

    get isEncounter(): boolean { return this.map.type === "encounter"; }

    get isGlobal(): boolean { return this.map.id === 1; }

    private loadMaps(maps: Map[]) {
        if (!maps || maps.length === 0) { return; }
        maps.forEach(map => {
            if (map.type === "area") { return this.areas.push(map); }
            if (map.type === "site") { return this.sites.push(map); }
            if (map.type === "city") { return this.cities.push(map); }
            if (map.type === "encounter") { return this.encounters.push(map); }
        });
    }

    private stateListener(state: AppState): Object {
        const mapPath = state.subRoutes.maps;
        return { mapPath };
    }
}
