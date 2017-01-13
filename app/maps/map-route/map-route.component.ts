import {StateService} from "../../services/state/state.service";

interface MapRouteParams extends angular.route.IRouteParamsService { mapId: string; }

export class MapRouteController {
    mapId: number;
    mapPath: number[] = [];

    constructor(
        private stateService: StateService,
        private $routeParams: MapRouteParams,
        private $location: angular.ILocationService
    ) {}

    $onInit(): void {
        const state = this.stateService.getState("/maps");
        if (state) {
            this.updatePath(state.path);
        } else {
            this.updatePath([1]);
        }
        this.mapId = parseInt(this.$routeParams.mapId, 10) || 1;
    }

    updatePath(path: number[]): void {
        this.mapPath = path;
        let state = this.stateService.getState("/maps");
        if (state) {
            state.path = path;
        } else {
            state = { path: path };
        }

        this.stateService.setState("/maps", state);
        this.$location.path(`/maps/${path[path.length - 1]}`);
    }
}
