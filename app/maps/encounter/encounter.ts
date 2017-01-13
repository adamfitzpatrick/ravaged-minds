import * as angular from "angular";
import {EncounterController} from "./encounter.component";
const template = require("./encounter.html");

export const encounter: angular.IComponentOptions = {
    template: template,
    controller: EncounterController,
    controllerAs: "vm",
    bindings: {
        encounter: "<"
    }
};
