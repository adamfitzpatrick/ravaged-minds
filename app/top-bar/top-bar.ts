import * as angular from "angular";
import {TopBarController} from "./top-bar.component";
const template = require("./top-bar.html");

export const topBar: angular.IComponentOptions = {
    template: template,
    controller: TopBarController,
    controllerAs: "vm"
};
