import * as angular from "angular";
import {PlayerAccessService, PlayerAccessAttrs} from "../player-access.service";

export class PlayerClickableController {

    constructor(
        private $scope: angular.IScope,
        private $element: angular.IAugmentedJQuery,
        private $attrs: PlayerAccessAttrs,
        private playerAccessService: PlayerAccessService
    ) {}

    $onInit(): void {
        this.setDisabled();
        this.playerAccessService.setWatch(this.$scope, this.$attrs, this.setDisabled);
    }

    private setDisabled = (): void => {
        const clickable = this.playerAccessService.hasAccess(this.$attrs.playerClickable);
        if (clickable) {
            this.$element[0].removeAttribute("disabled");
            this.$element[0].style.pointerEvents = "auto";
            return;
        }
        this.$element[0].setAttribute("disabled", "");
        this.$element[0].style.pointerEvents = "none";
    }
}
