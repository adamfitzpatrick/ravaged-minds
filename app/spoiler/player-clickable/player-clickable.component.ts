import * as angular from "angular";
import { SpoilerService, PlayerAccessAttrs } from "../spoiler.service";

export class PlayerClickableController {

    constructor(
        private $scope: angular.IScope,
        private $element: angular.IAugmentedJQuery,
        private $attrs: PlayerAccessAttrs,
        private $parse: angular.IParseService,
        private spoilerService: SpoilerService
    ) {}

    $onInit(): void {
        this.setDisabled(this.spoilerService.hasAccess(this.playerClickability()));
        this.$scope.$watch(this.playerClickability, this.setDisabled);
    }

    private playerClickability = (): boolean => {
        let playerClickable;
        try {
            const value = this.$parse(this.$attrs.playerClickable)(this.$scope);
            playerClickable = value || this.$attrs.playerClickable === "true";
        } catch (err) {
            playerClickable = this.$attrs.playerVisible === "true";
        }
        return this.spoilerService.hasAccess(playerClickable);
    }

    private setDisabled = (clickable: boolean): void => {
        if (clickable) {
            this.$element[0].removeAttribute("disabled");
            this.$element[0].style.pointerEvents = "auto";
            return;
        }
        this.$element[0].setAttribute("disabled", "");
        this.$element[0].style.pointerEvents = "none";
    }
}
