import * as angular from "angular";
import {StoryController} from "./story.component";
const template = require("./story.html");

export const story: angular.IComponentOptions = {
    template: template,
    controller: StoryController,
    controllerAs: "vm"
};
