import * as angular from "angular";

export class ClickAware {
    onBlur: () => void;

    constructor(
        private $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $timeout: angular.ITimeoutService
    ) {
        this.$window.addEventListener("click", this.clickHandler);
    }

    private clickHandler = ($event: MouseEvent) => {
        let node = $event.target as HTMLElement;
        while (node && node.nodeName !== "HTML") {
            if (node.nodeName === "CLICK-AWARE") { return; }
            node = node.parentNode as HTMLElement;
        }
        this.onBlur();
        this.$timeout(() => this.$scope.$apply());
    }
}
