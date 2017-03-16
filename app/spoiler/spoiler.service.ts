import { AppStateService } from "../app-state/app-state.service";
import { AppState, Spoilers } from "../app-state/states";

export interface PlayerAccessAttrs extends angular.IAttributes {
    playerVisible: string;
    playerClickable: string;
}

export class SpoilerService {
    spoilers: Spoilers;

    constructor(private appStateService: AppStateService) {
        this.spoilers = this.appStateService.getState().spoilers;
        this.appStateService.connect(this.stateListener, this);
        // TODO Kill the next line
        this.dmMode = true;
    }

    get dmMode(): boolean { return this.spoilers.dmMode; }

    set dmMode(dmMode: boolean) {
        this.spoilers.dmMode = dmMode;
        this.appStateService.dispatchSetSpoilerView(this.spoilers);
    }

    get showSpoilers(): boolean { return this.spoilers.showSpoilers; }

    set showSpoilers(showSpoilers: boolean) {
        this.spoilers.showSpoilers = showSpoilers;
        this.appStateService.dispatchSetSpoilerView(this.spoilers);
    }

    hasAccess(playerAccessible: boolean | string) {
        if (typeof playerAccessible === "string") { playerAccessible = playerAccessible === "true"; }
        return playerAccessible || this.spoilers.showSpoilers;
    }

    private stateListener = (state: AppState): { spoilers: Spoilers } => {
        return { spoilers: state.spoilers };
    }
}
