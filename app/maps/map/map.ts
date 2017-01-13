import * as angular from "angular";
import {MapController} from "./map.component";
const template = require("./map.html");

export const map: angular.IComponentOptions = {
    template: template,
    controller: MapController,
    controllerAs: "vm"
};
