import {NoteController} from "./note.component";
const template = require("./note.html");

export const note: angular.IComponentOptions = {
    template: template,
    controller: NoteController,
    controllerAs: "vm",
    bindings: {
        note: "<",
        onNoteChange: "&",
        stories: "<",
        entities: "<"
    }
};
