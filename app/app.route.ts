import * as angular from "angular";
import {MapService} from "./maps/map.service";
import {Map} from "./maps/map.model";

interface RavagedMindsRoute extends angular.route.IRoute {
    current: {
        locals: {
            mapData: { map: Map; mapMaps: Map[]}
        },
        params: {
            storyId: string;
            mapId: string;
            entityId: string;
        }
    };
}

const mapRoute = (mapService: MapService, $route: RavagedMindsRoute) => {
    let mapData = { map: null, mapMaps: null };
    return mapService.get(parseInt($route.current.params.mapId, 10)).then(map => {
        mapData.map = map;
        if (map.maps && map.maps.length > 0) {
            return mapService.get(map.maps).then(maps => {
                mapData.mapMaps = maps;
                return mapData;
            });
        } else {
            return mapData;
        }
    });
};

export function initRoutes(app: angular.IModule) {
    app.config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.when("/", { template: "<landing></landing>" })
            .when("/story", { template: "<story></story>" })
            .when("/story/:storyId", { template: "<story-detail></story-detail>"})
            .when("/background", { template: "<background></background>" })
            .when("/maps", { redirectTo: "/maps/1" })
            .when("/maps/undefined", { redirectTo: "/maps/1" })
            .when("/maps/:mapId", {
                template: "<map></map>",
                resolve: { mapData: mapRoute }
            })
            .when("/entities", { template: "<entities></entities>"})
            .when("/entities/:entityId", { template: "<entity-detail-route></entity-detail-route>"})
            .when("/combat", { template: "<combat></combat>" })
            .when("/notes", { template: "<notes></notes>" })
            .when("/", { redirectTo: "/story" })
            .otherwise({ redirectTo: "/story" });
    });
}
