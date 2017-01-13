import * as angular from "angular";
import {MapRouteController} from "./map-route.component";
const template = require("./map-route.html");

export const mapRoute: angular.IComponentOptions = {
    template: template,
    controller: MapRouteController,
    controllerAs: "vm"
};
