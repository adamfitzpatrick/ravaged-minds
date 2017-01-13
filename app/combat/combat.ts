import * as angular from "angular";
import {CombatController} from "./combat.component";
const template = require("./combat.html");

export const combat: angular.IComponentOptions = {
    template: template,
    controller: CombatController,
    controllerAs: "vm"
};
