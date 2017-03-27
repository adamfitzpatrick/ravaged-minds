import * as angular from "angular";

interface CombatantActivatorAttrs extends angular.IAttributes {
    combatantActivator: string;
}

export const combatantActivator = (
        $parse: angular.IParseService,
        $animate: angular.animate.IAnimateService,
        $timeout: angular.ITimeoutService
    ): angular.IDirective => {
    return {
        restrict: "A",
        link: (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: CombatantActivatorAttrs): void => {
            const isActiveGetter = $parse(attrs.combatantActivator);
            const transition = element[0].style.transition;
            const style = angular.copy(element[0].style);

            const activate = () => {
                const htmlElement = element[0];
                const rect = htmlElement.getBoundingClientRect();
                htmlElement.style.transition = "none";
                htmlElement.style.position = "fixed";
                htmlElement.style.top = `${rect.top}px`;
                htmlElement.style.left = `${rect.left}px`;
                $timeout(() => {
                    htmlElement.style.transition = transition;
                    htmlElement.style.top = "calc(50vh - 146px)";
                    htmlElement.style.left = "calc(50vw - 200px)";
                    htmlElement.style.zIndex = "99";
                });
            };

            const deactivate = () => {
                const htmlElement = element[0];
                const rect = htmlElement.getBoundingClientRect();
                const scrollTop = document.getElementById("combatcontent").scrollTop;
                htmlElement.style.transition = "none";
                htmlElement.style.position = "absolute";
                htmlElement.style.top = `calc(${rect.top}px - 108px - 2rem + ${scrollTop}px)`;
                htmlElement.style.left = `calc(${rect.left}px - 2rem)`;
                $timeout(() => {
                    htmlElement.style.transition = transition;
                    htmlElement.style.top = style.top;
                    htmlElement.style.left = style.left;
                    htmlElement.style.zIndex = style.zIndex;
                });
            };

            const handleStatusChange = (isActive: boolean, wasActive: boolean) => {
                if (isActive) {
                    activate();
                } else if (wasActive) {
                    deactivate();
                }
            };

            scope.$watch(() => isActiveGetter(scope), handleStatusChange);
        }
    };
};
