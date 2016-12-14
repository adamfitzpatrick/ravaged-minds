import * as angular from "angular";

export function initRoutes(app: angular.IModule) {
    app.config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.when("/", { template: "<landing></landing>" })
            .when("/story", { template: "<story></story>" })
            .otherwise("/");
    });
}
