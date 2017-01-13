import * as angular from "angular";
import {EntityDetailController} from "./entity-detail.component";
const template = require("./entity-detail.html");

export const entityDetail: angular.IComponentOptions = {
    template: template,
    controller: EntityDetailController,
    controllerAs: "vm",
    bindings: {
        entity: "<",
        noHeader: "<"
    }
};
