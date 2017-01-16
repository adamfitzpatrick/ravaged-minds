import * as angular from "angular";
import {PlayerAccessService, PlayerAccessAttrs} from "../player-access.service";

export class PlayerVisibleController {
    originalDisplay: string;
    constructor(
        private $scope: angular.IScope,
        private $element: angular.IAugmentedJQuery,
        private $attrs: PlayerAccessAttrs,
        private playerAccessService: PlayerAccessService
    ) {}

    $onInit(): void {
        this.setVisibility();
        this.playerAccessService.setWatch(this.$scope, this.$attrs, this.setVisibility);
    }

    private setVisibility = (): void => {
        const visible = this.playerAccessService.hasAccess(this.$attrs.playerVisible);
        if (visible) {
            this.$element[0].style.display = this.originalDisplay;
            this.$element[0].style.visibility = "visible";
            return;
        }
        this.originalDisplay = this.$element[0].style.display;
        this.$element[0].style.display = "none";
        this.$element[0].style.visibility = "hidden";
    }
}
