import * as angular from "angular";
import {StateService} from "../services/state/state.service";
import {navMenu} from "./nav-menu";
import {PlayerAccessService} from "../player-access/player-access.service";
import {ACCESS_TOKEN_KEY} from "../login/login.service";

export class TopBarController {
    navItems: any[];
    logoutRequests: number = 0;

    constructor(
        private $location: angular.ILocationService,
        private stateService: StateService,
        private playerAccessService: PlayerAccessService
    ) {}

    $onInit(): void {
        this.navItems = navMenu;
    }

    setNav(navItem: any): void {
        if (navItem.path === this.currentNavItem) {
            this.stateService.clearState(navItem.path);
        }
        this.$location.path(navItem.path);
    }

    requestLogout(): void {
        this.logoutRequests++;
        if (this.logoutRequests > 3) {
            this.logoutRequests = 0;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            this.playerAccessService.dmSwitch = false;
            this.$location.path("/login");
        }
    }

    get currentNavItem(): string {
        const match = this.$location.path().match(/^\/[^\/]*/);
        return match && match[0];
    }

    set currentNavItem(item: string) { /* not used */ }
}
