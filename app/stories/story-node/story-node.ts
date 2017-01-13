import * as angular from "angular";
import {StoryNodeController} from "./story-node.component";
const template = require("./story-node.html");

export const storyNode: angular.IComponentOptions = {
    template: template,
    controller: StoryNodeController,
    controllerAs: "vm",
    bindings: {
        story: "=",
        onEnter: "&",
        onExit: "&"
    }
};
