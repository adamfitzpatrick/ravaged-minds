import * as angular from "angular";
import {LandingController} from "./landing.component";
const template = require("./landing.html");

export const landing: angular.IComponentOptions = {
    template: template,
    controller: LandingController,
    controllerAs: "vm"
};
