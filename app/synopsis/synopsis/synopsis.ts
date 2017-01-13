import * as angular from "angular";
import {SynopsisController} from "./synopsis.component";
const template = require("./synopsis.html");

export const synopsis: angular.IComponentOptions = {
    template: template,
    controller: SynopsisController,
    controllerAs: "vm",
    bindings: { synopsis: "<" }
};
