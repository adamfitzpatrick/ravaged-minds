import {NotesController} from "./notes.component";
const template = require("./notes.html");

export const notes: angular.IComponentOptions = {
    template: template,
    controller: NotesController,
    controllerAs: "vm",
    bindings: {
        linkId: "<",
        linkType: "@"
    }
};
