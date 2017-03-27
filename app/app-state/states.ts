import { Combatant } from "../combat/combatant.model";
export type Route = "story" | "background" | "maps" | "entities" | "combat" | "notes";

export interface SubRoutes {
    [route: string]: number[];
}

export interface Spoilers {
    showSpoilers: boolean;
    dmMode: boolean;
}

export interface Combat {
    combatants: Combatant[];
    turn: number;
    round: number;
}

export interface AppState {
    activeRoute: Route;
    subRoutes: SubRoutes;
    spoilers: Spoilers;
    combat: Combat;
}

export const INITIAL_STATE: AppState = {
    activeRoute: "story",
    subRoutes: {},
    spoilers: {
        showSpoilers: false,
        dmMode: false
    },
    combat: {
        combatants: [],
        turn: 0,
        round: 0
    }
};

export const ROUTES: Route[] = [ "story", "background", "maps", "entities", "combat", "notes" ];
export const ROUTE_SEARCH_REGEX = new RegExp(`^\/(${ROUTES.join("|").concat("|login")})`);
