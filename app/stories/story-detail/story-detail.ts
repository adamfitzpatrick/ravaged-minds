import * as angular from "angular";
import {StoryDetailController} from "./story-detail.component";
const template = require("./story-detail.html");

export const storyDetail: angular.IComponentOptions = {
    template: template,
    controller: StoryDetailController,
    controllerAs: "vm"
};
