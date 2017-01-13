import {AppRootScope} from "../app.run";

interface WatchCallback { (newValue: string, oldValue: string, scope: angular.IScope): any; }

export interface PlayerAccessAttrs extends angular.IAttributes {
    playerVisible: string;
    playerClickable: string;
}

export interface PlayerAccessService {
    (attrValue: string): boolean;
    watch: ($scope: angular.IScope, $attrs: PlayerAccessAttrs, callback: Function) => void;
}

function calculateVisibility(value: string): boolean {
    return value !== "false" && !!value;
}

function watchExpression($rootScope: AppRootScope, $attrs: PlayerAccessAttrs): () => string {
    return () => `${$rootScope.dm}${$attrs.playerVisible}${$attrs.playerClickable}`;
}

export function playerAccessService($rootScope: AppRootScope): PlayerAccessService {
    const watch = ($scope: angular.IScope, $attrs: PlayerAccessAttrs, callback: () => void): void => {
        $scope.$watch(watchExpression($rootScope, $attrs), (callback as WatchCallback));
    };

    const service = (attrValue: string): boolean => $rootScope.dm || calculateVisibility(attrValue);
    (service as PlayerAccessService).watch = watch;

    return (service as PlayerAccessService);
}
