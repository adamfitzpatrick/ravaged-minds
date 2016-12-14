import * as angular from "angular";
import {StaticDataService, NavBarDataItem} from "../services/static-data/static-data.service";

export class TopBarController {
    navItems: NavBarDataItem[];

    constructor(
        private $location: angular.ILocationService,
        private staticDataService: StaticDataService
    ) {}

    $onInit(): void {
        this.navItems = this.staticDataService("navMenu");
    }

    get currentNavItem() {
        return `#${this.$location.path()}`;
    }

    set currentNavItem(item: string) {
        this.$location.path(item);
    }
}
