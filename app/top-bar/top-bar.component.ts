import * as angular from "angular";
import {ACCESS_TOKEN_KEY} from "../login/login.service";
import { ROUTES, Route, AppState, Spoilers } from "../app-state/states";
import { AppStateService } from "../app-state/app-state.service";
import { SpoilerService } from "../spoiler/spoiler.service";
import { NavService } from "../nav/nav.service";

export class TopBarController {
    routes: Route[];
    dmView: boolean = false;
    logoutRequests: number = 0;

    private activeRoute: Route;

    constructor(
        private $location: angular.ILocationService,
        private appStateService: AppStateService,
        private navService: NavService,
        private spoilerService: SpoilerService
    ) {}

    $onInit(): void {
        this.routes = ROUTES;
        this.dmView = this.appStateService.getState().spoilers.dmMode;
        this.appStateService.connect(this.stateListener, this);
    }

    toggleSpoilers(): void { this.spoilerService.showSpoilers = this.dmView; }

    requestLogout(): void {
        this.logoutRequests++;
        if (this.logoutRequests > 3) {
            this.logoutRequests = 0;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            this.$location.path("/login");
        }
    }

    gotoRoute(route: Route): void { this.navService.gotoRoute(route, true); }

    get selectedRoute (): Route { return this.activeRoute; }

    private stateListener = (state: AppState) => { return { activeRoute: state.activeRoute }; };
}
