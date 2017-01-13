import * as angular from "angular";
import {StoriesController} from "./stories.component";
const template = require("./stories.html");

export const stories: angular.IComponentOptions = {
    template: template,
    controller: StoriesController,
    controllerAs: "vm"
};
