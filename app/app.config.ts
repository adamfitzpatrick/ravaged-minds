import * as angular from "angular";

export function initConfig(app: angular.IModule) {
    app.config((
        $httpProvider: angular.IHttpProvider,
        $mdThemingProvider: angular.material.IThemingProvider,
        $mdAriaProvider: any
    ) => {
        $httpProvider.interceptors.push(($q: angular.IQService, ORIGIN: string) => {
            return {
                request: (config) => {
                    if (/^\//.test(config.url)) {
                        config.url = `${ORIGIN}${config.url}`;
                    }
                    return config;
                }
            };
        });

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
                default: "50"
            })
            .warnPalette("red");
        $mdThemingProvider.theme("map_page")
            .primaryPalette("blue-grey")
            .accentPalette("red")
            .warnPalette("blue");
        $mdAriaProvider.disableWarnings();
    });
}
