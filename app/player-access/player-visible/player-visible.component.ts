import * as angular from "angular";
import {PlayerAccessService, PlayerAccessAttrs} from "../player-access.service";


export class PlayerVisibleController {

    constructor(
        private $scope: angular.IScope,
        private $element: angular.IAugmentedJQuery,
        private $attrs: PlayerAccessAttrs,
        private playerAccessService: PlayerAccessService
    ) {}

    $onInit(): void {
        this.setVisibility();
        this.playerAccessService.watch(this.$scope, this.$attrs, this.setVisibility);
    }

    private setVisibility = (): void => {
        const visible = this.playerAccessService(this.$attrs.playerVisible);
        if (visible) {
            this.$element[0].style.visibility = "visible";
            return;
        }
        this.$element[0].style.visibility = "hidden";
    }
}
