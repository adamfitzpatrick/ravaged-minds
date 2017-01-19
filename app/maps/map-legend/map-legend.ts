import * as angular from "angular";
import {MapLegendController} from "./map-legend.component";
const template = require("./map-legend.html");

export const mapLegend: angular.IComponentOptions = {
    template: template,
    controller: MapLegendController,
    controllerAs: "vm",
    bindings: { topLevel: "@" }
};
