import * as angular from "angular";
import {EntityDetailRouteController} from "./entity-detail-route.component";
const template = require("./entity-detail-route.html");

export const entityDetailRoute: angular.IComponentOptions = {
    template: template,
    controller: EntityDetailRouteController,
    controllerAs: "vm"
};
