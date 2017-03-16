import * as angular from "angular";
import { SpoilerService, PlayerAccessAttrs } from "../spoiler.service";

export class PlayerVisibleController {
    originalDisplay: string;

    constructor(
        private $scope: angular.IScope,
        private $element: angular.IAugmentedJQuery,
        private $attrs: PlayerAccessAttrs,
        private spoilerService: SpoilerService,
        private $parse: angular.IParseService
    ) {}

    $onInit(): void {
        this.originalDisplay = this.$element[0].style.display;
        this.setVisibility(this.playerVisibility());
        this.$scope.$watch(this.playerVisibility, this.setVisibility);
    }

    private playerVisibility = (): boolean => {
        let playerVisible;
        try {
            const value = this.$parse(this.$attrs.playerVisible)(this.$scope);
            playerVisible = value || this.$attrs.playerVisible === "true";
        } catch (err) {
            playerVisible = this.$attrs.playerVisible === "true";
        }
        return this.spoilerService.hasAccess(playerVisible);
    }

    private setVisibility = (visible: boolean): void => {
        if (visible) {
            this.$element[0].style.display = this.originalDisplay;
            this.$element[0].style.visibility = "visible";
            return;
        }
        this.$element[0].style.display = "none";
        this.$element[0].style.visibility = "hidden";
    }
}
