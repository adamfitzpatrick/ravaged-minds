import * as angular from "angular";
import { AppStateService } from "../app-state/app-state.service";
import { Route } from "../app-state/states";

export class NavService {

    constructor(
        private appStateService: AppStateService,
        private $location: angular.ILocationService
    ) {}

    gotoRoute(route: Route, resetable?: boolean): void {
        if (resetable && route === this.appStateService.getActiveRoute()) {
            this.appStateService.dispatchResetSubRoutes(route);
        }
        const subRoutes = this.appStateService.getSubRoutes(route);
        const lastSubRoute = (subRoutes && subRoutes[subRoutes.length - 1]) || "";
        this.appStateService.dispatchSetRoute(route);
        this.$location.path(`/${route}/${lastSubRoute}`);
    }

    gotoSubRoute(route: Route, subRoute: number): void {
        this.appStateService.dispatchAddSubRoute(route, subRoute);
        this.gotoRoute(route);
    }

    gotoPrevSubRoute(route: Route): void {
        this.appStateService.dispatchBackSubRoute(route);
        this.gotoRoute(route);
    }
}
