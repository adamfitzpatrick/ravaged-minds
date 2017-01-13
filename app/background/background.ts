import * as angular from "angular";
import {BackgroundController} from "./background.component";
const template = require("./background.html");

export const background: angular.IComponentOptions = {
    template: template,
    controller: BackgroundController,
    controllerAs: "vm"
};
