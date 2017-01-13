import * as angular from "angular";
import {MapIconController} from "./map-icon.component";
const template = require("./map-icon.html");

export const mapIcon: angular.IComponentOptions = {
    template: template,
    controller: MapIconController,
    controllerAs: "vm",
    bindings: {
        map: "<"
    }
};
