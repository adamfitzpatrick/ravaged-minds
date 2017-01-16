interface WatchCallback { (newValue: string, oldValue: string, scope: angular.IScope): any; }

export interface PlayerAccessAttrs extends angular.IAttributes {
    playerVisible: string;
    playerClickable: string;
}

export const DM = "RAVAGEDMINDS_DM";
export const DM_SWITCH = "RAVAGEDMINDS_DM_SWITCH";

export class PlayerAccessService {

    constructor(private $location: angular.ILocationService) {}

    hasAccess(attrValue: string): boolean { return this.dm || this.calculateVisibility(attrValue); }

    setWatch($scope: angular.IScope, $attrs: PlayerAccessAttrs, callback: () => void): void {
        $scope.$watch(this.watchExpression($attrs), (callback as WatchCallback));
    };

    get dm(): boolean { return localStorage.getItem(DM) === true.toString(); }

    set dm(dm: boolean) {
        localStorage.setItem(DM, dm.toString());
        if (this.$location.path() === "/combat") { this.$location.path("/story"); }
    }

    get dmSwitch(): boolean { return localStorage.getItem(DM_SWITCH) === true.toString(); }

    set dmSwitch(dmSwitch: boolean) { localStorage.setItem(DM_SWITCH, dmSwitch.toString()); }

    private calculateVisibility(value: string): boolean {
        return value !== "false" && !!value;
    }

    private watchExpression($attrs: PlayerAccessAttrs): () => string {
        return () => `${this.dm}${$attrs.playerVisible}${$attrs.playerClickable}`;
    }
}
