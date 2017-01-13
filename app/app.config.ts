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
            .primaryPalette("grey")
            .accentPalette("green")
            .warnPalette("red");
        $mdThemingProvider.theme("content_page")
            .primaryPalette("blue-grey", {
                "default": "50"
            })
            .warnPalette("red");
        $mdThemingProvider.theme("map_page")
            .primaryPalette("blue-grey")
            .accentPalette("red")
            .warnPalette("blue");
        $mdAriaProvider.disableWarnings();
    });
}
