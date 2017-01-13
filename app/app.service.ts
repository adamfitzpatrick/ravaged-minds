import * as angular from "angular";
import {StoryService} from "./stories/story.service";
import {StateService} from "./services/state/state.service";
import {EntityService} from "./entities/entity.service";
import {MapService} from "./maps/map.service";
import {NoteService} from "./notes/note.service";
import {PlayerService} from "./player/player.service";
import {SynopsisService} from "./synopsis/synopsis.service";
import {playerAccessService} from "./player-access/player-access.service";

export function initServices(app: angular.IModule) {
    app.service("storyService", StoryService);
    app.service("mapService", MapService);
    app.service("entityService", EntityService);
    app.service("noteService", NoteService);
    app.service("stateService", StateService);
    app.service("playerService", PlayerService);
    app.service("synopsisService", SynopsisService);
    app.service("playerAccessService", playerAccessService);
}
