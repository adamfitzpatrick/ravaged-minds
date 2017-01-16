interface WatchCallback { (newValue: string, oldValue: string, scope: angular.IScope): any; }

export interface PlayerAccessAttrs extends angular.IAttributes {
    playerVisible: string;
    playerClickable: string;
}

export const ACCESS_TOKEN_KEY = "RAVAGEDMINDSACCESSTOKEN";
export const DM_SWITCH = "DM_SWITCH";

export class PlayerAccessService {
    dm: boolean;
    dmSwitch: boolean;

    hasAccess(attrValue: string): boolean { return this.dm || this.calculateVisibility(attrValue); }

    setWatch($scope: angular.IScope, $attrs: PlayerAccessAttrs, callback: () => void): void {
        $scope.$watch(this.watchExpression($attrs), (callback as WatchCallback));
    };

    setDm(dm: boolean): void {
        this.dm = dm;
        if (this.dm) { this.dmSwitch = true; }
    }

    getDmSwitch(): boolean {
        if (localStorage.getItem(DM_SWITCH)) { this.dmSwitch = true; }
        return this.dmSwitch;
    }

    private calculateVisibility(value: string): boolean {
        return value !== "false" && !!value;
    }

    private watchExpression($attrs: PlayerAccessAttrs): () => string {
        return () => `${this.dm}${$attrs.playerVisible}${$attrs.playerClickable}`;
    }
}
