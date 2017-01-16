import * as angular from "angular";
import {ToasterService} from "./toaster/toaster.service";
import {ACCESS_TOKEN_KEY} from "./login/login.service";

const AUTHORIZATION = "authorization";

export function initConfig(app: angular.IModule) {

    app.config(($httpProvider: angular.IHttpProvider) => {

        $httpProvider.interceptors.push((
                $q: angular.IQService,
                ORIGIN: string,
                toasterService: ToasterService,
                $location: angular.ILocationService
            ) => {
            return {
                request: (config) => {
                    if (/^\//.test(config.url)) {
                        config.url = `${ORIGIN}${config.url}`;
                        config.headers[AUTHORIZATION] = localStorage.getItem(ACCESS_TOKEN_KEY);
                    }
                    return config;
                },
                responseError: (rejection) => {
                    toasterService(`Error ${rejection.status} (${rejection.statusText})
                    on call to ${rejection.config.url}`);
                    $location.path("/login");
                    return $q.reject(rejection);
                }
            };
        });
    });

    app.config(($mdThemingProvider: angular.material.IThemingProvider, $mdAriaProvider: any) => {
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
