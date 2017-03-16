export type Route = "story" | "background" | "maps" | "entities" | "combat" | "notes";

export interface SubRoutes {
    [route: string]: number[];
}

export interface Spoilers {
    showSpoilers: boolean;
    dmMode: boolean;
}

export interface AppState {
    activeRoute: Route;
    subRoutes: SubRoutes;
    spoilers: Spoilers;
}

export const INITIAL_STATE: AppState = {
    activeRoute: "story",
    subRoutes: {},
    spoilers: {
        showSpoilers: false,
        dmMode: false
    }
};

export const ROUTES: Route[] = [ "story", "background", "maps", "entities", "combat", "notes" ];
export const ROUTE_SEARCH_REGEX = new RegExp(`^\/(${ROUTES.join("|")})`);
