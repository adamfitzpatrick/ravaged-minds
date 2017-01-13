export interface AppRootScope extends angular.IRootScopeService {
    dm: boolean;
    dmSwitch: boolean;
}

const DM_KEY = "DM_KEY";

export function initRun(app: angular.IModule) {
    app.run(($rootScope: AppRootScope) => {
        if (localStorage.getItem(DM_KEY)) {
            $rootScope.dm = true;
            $rootScope.dmSwitch = true;
        }
    });
}
