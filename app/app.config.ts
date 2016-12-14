import * as angular from "angular";

export function initConfig(app: angular.IModule) {
    app.config((
        $mdThemingProvider: angular.material.IThemingProvider,
        $mdAriaProvider: any
    ) => {
        $mdThemingProvider.theme("default")
            .primaryPalette("blue-grey")
            .accentPalette("lime")
            .warnPalette("red");
        $mdThemingProvider.theme("success")
            .primaryPalette("blue")
            .accentPalette("green")
            .warnPalette("red");
        $mdAriaProvider.disableWarnings();
    });
}
