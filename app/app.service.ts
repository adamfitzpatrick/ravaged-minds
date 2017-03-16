import * as angular from "angular";
import {StoryService} from "./stories/story.service";
import {EntityService} from "./entities/entity.service";
import {MapService} from "./maps/map.service";
import {NoteService} from "./notes/note.service";
import {SynopsisService} from "./synopsis/synopsis.service";
import {loginService} from "./login/login.service";
import {toasterService} from "./toaster/toaster.service";
import { AppStateService } from "./app-state/app-state.service";
import { SpoilerService } from "./spoiler/spoiler.service";
import { NavService } from "./nav/nav.service";

export function initServices(app: angular.IModule) {
    app.service("appStateService", AppStateService);
    app.service("navService", NavService);
    app.service("spoilerService", SpoilerService);
    app.service("loginService", loginService);
    app.service("toasterService", toasterService);
    app.service("storyService", StoryService);
    app.service("mapService", MapService);
    app.service("entityService", EntityService);
    app.service("noteService", NoteService);
    app.service("synopsisService", SynopsisService);
}
