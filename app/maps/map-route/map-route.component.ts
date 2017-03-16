interface MapRouteParams extends angular.route.IRouteParamsService { mapId: string; }

export class MapRouteController {
    mapId: number;
    mapPath: number[] = [];

    constructor(
        private $routeParams: MapRouteParams,
        private $location: angular.ILocationService
    ) {}

    $onInit(): void {
        this.mapId = parseInt(this.$routeParams.mapId, 10) || 1;
    }

    updatePath(path: number[]): void {
        this.mapPath = path;
        this.$location.path(`/maps/${path[path.length - 1]}`);
    }
}
