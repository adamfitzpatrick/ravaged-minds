import * as angular from "angular";
import {LoginController} from "./login.component";
const template = require("./login.html");

export const login: angular.IComponentOptions = {
    template: template,
    controller: LoginController,
    controllerAs: "vm"
};
