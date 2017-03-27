import * as angular from "angular";
import { INgRedux } from "ng-redux";
import { Route, AppState, Spoilers, SubRoutes, ROUTE_SEARCH_REGEX, Combat } from "./states";
import {
    setRoute, setSpoilers, setSubRoutes, addSubRoute, resetSubRoutes, backSubRoute, setCombat
} from "./actions";
import { USERNAME } from "../login/login.service";
import { Combatant } from "../combat/combatant.model";

export interface StateListener { (state: AppState): Object; }

export class AppStateService {

    constructor(
        private $ngRedux: INgRedux,
        private $location: angular.ILocationService
    ) {
        this.initializeSpoilers();
        this.initializeActiveRoute();
    }

    connect(listener: StateListener, target: any) {
        this.$ngRedux.connect(listener)(target);
    }

    getState(): AppState { return this.$ngRedux.getState(); }

    getActiveRoute(): Route { return this.$ngRedux.getState().activeRoute; }

    getSubRoutes(route: Route): string[] { return this.$ngRedux.getState().subRoutes[route] || []; }

    getCombat(): Combat { return this.$ngRedux.getState().combat; }

    dispatchSetRoute(route: Route): void {
        this.$ngRedux.dispatch(setRoute(route));
    }

    dispatchSetSubRoutes(route: Route, subRoutes: number[]): void {
        this.$ngRedux.dispatch(setSubRoutes(route, subRoutes));
    }

    dispatchAddSubRoute(route: Route, subRoute: number): void {
        this.$ngRedux.dispatch(addSubRoute(route, subRoute));
    }

    dispatchResetSubRoutes(route: Route): void {
        this.$ngRedux.dispatch(resetSubRoutes(route));
    }

    dispatchBackSubRoute(route: Route): void {
        this.$ngRedux.dispatch(backSubRoute(route));
    }

    dispatchSetSpoilerView(spoilers: Spoilers): void {
        this.$ngRedux.dispatch(setSpoilers(spoilers));
    }

    dispatchSetCombat(combatants: Combatant[], turn: number, round: number): void {
        this.$ngRedux.dispatch(setCombat(combatants, turn, round));
    }

    private initializeActiveRoute() {
        const route = ROUTE_SEARCH_REGEX.exec(this.$location.path())[1] as Route;
        this.dispatchSetRoute(route);
    }

    private initializeSpoilers() {
        const spoilers: Spoilers = {
            dmMode: localStorage.getItem(USERNAME) === "dm",
            showSpoilers: localStorage.getItem(USERNAME) === "dm"
        };
        this.dispatchSetSpoilerView(spoilers);
    }
}
