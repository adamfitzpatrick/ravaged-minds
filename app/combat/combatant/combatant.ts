import * as angular from "angular";
import { CombatantController } from "./combatant.component";
const template = require("./combatant.html");

export const combatant: angular.IComponentOptions = {
    template,
    controller: CombatantController,
    controllerAs: "vm",
    bindings: {
        combatant: "="
    }
};
