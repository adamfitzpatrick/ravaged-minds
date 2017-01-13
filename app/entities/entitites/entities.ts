import * as angular from "angular";
import {EntitiesController} from "./entities.component";
const template = require("./entities.html");

export const entities: angular.IComponentOptions = {
    template: template,
    controller: EntitiesController,
    controllerAs: "vm"
};
