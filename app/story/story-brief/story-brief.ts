import * as angular from "angular";
import {StoryBriefController} from "./story-brief.component";
const template = require("./story-brief.html");

export const storyBrief: angular.IComponentOptions = {
    template: template,
    controller: StoryBriefController,
    controllerAs: "vm",
    bindings: {
        left: "=",
        brief: "<"
    }
};
