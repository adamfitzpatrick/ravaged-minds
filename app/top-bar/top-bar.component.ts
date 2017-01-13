import * as angular from "angular";
import {StateService} from "../services/state/state.service";
import {navMenu} from "./nav-menu";
import {AppRootScope} from "../app.run";

export class TopBarController {
    navItems: any[];
    dm: boolean;
    dmSwitch: boolean;

    constructor(
        private $location: angular.ILocationService,
        private stateService: StateService,
        private $rootScope: AppRootScope
    ) {}

    $onInit(): void {
        this.navItems = navMenu;
        this.dm = this.$rootScope.dm;
        this.dmSwitch = this.$rootScope.dmSwitch;
    }

    setNav(navItem: any): void {
        if (navItem.path === this.currentNavItem) {
            this.stateService.clearState(navItem.path);
        }
        this.$location.path(navItem.path);
    }

    setDm(): void { this.$rootScope.dm = this.dm; }

    get currentNavItem(): string {
        const match = this.$location.path().match(/^\/[^\/]*/);
        return match && match[0];
    }

    set currentNavItem(item: string) { /* not used */ }
}
