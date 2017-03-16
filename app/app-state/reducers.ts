import { Route, Spoilers, INITIAL_STATE, SubRoutes } from "./states";
import { Reducer } from "redux";
import { RouteAction, SpoilersAction, SubRoutesAction } from "./actions";

/**
 * Reducer for the activeRoute application state
 * @param activeRouteValue
 * @param action
 * @returns {Route}
 */
export const activeRoute: Reducer<Route> = (activeRouteValue: Route, action: RouteAction): Route => {
    if (action.type === "SET_ROUTE") {
        return action.route;
    }
    return activeRouteValue || INITIAL_STATE.activeRoute;
};

/**
 * Reducer for subRoutes application state.
 *     SET_SUB_ROUTES: replaces all existing subroutes if any
 *     ADD_SUB_ROUTE: adds a subroute to the end of the subroutes array.  Note that
 *         a subroute at the end of the array will not be duplicated.
 * @param subRoutesValue
 * @param action
 * @returns {SubRoutes}
 */
export const subRoutes: Reducer<SubRoutes> = (subRoutesValue: SubRoutes, action: SubRoutesAction): SubRoutes => {
    const newSubRoutes = Object.assign({}, subRoutesValue || {});
    if (action.type === "SET_SUB_ROUTES") {
        newSubRoutes[action.route] = action.subRoutes as number[];
    } else if (action.type === "ADD_SUB_ROUTE") {
        addSubRoute(newSubRoutes, action);
    } else if (action.type === "BACK_SUB_ROUTE") {
        backSubRoute(newSubRoutes, action);
    } else if (action.type === "RESET_SUB_ROUTE") {
        newSubRoutes[action.route] = [];
    }
    return newSubRoutes || INITIAL_STATE.subRoutes;
};

function addSubRoute(subRoutesValue: SubRoutes, action: SubRoutesAction): SubRoutes {
    let subRouteArray = subRoutesValue[action.route];
    if (!subRouteArray) {
        subRouteArray = [action.subRoutes as number];
    } else if (subRouteArray[subRouteArray.length - 1] !== action.subRoutes as number) {
        subRouteArray = subRoutesValue[action.route].concat([action.subRoutes as number]);
    }
    subRoutesValue[action.route] = subRouteArray;
    return subRoutesValue;
}

function backSubRoute(subRoutesValue: SubRoutes, action: SubRoutesAction): SubRoutes {
    if (subRoutesValue[action.route] && subRoutesValue[action.route].length) {
        const subRouteArr = subRoutesValue[action.route];
        subRoutesValue[action.route] = subRouteArr.slice(0, subRouteArr.length - 1);
    }
    return subRoutesValue;
}

/**
 * Reducer for spoilers application state
 * @param spoilersValue
 * @param action
 * @returns {Spoilers}
 */
export const spoilers: Reducer<Spoilers> = (spoilersValue: Spoilers, action: SpoilersAction): Spoilers => {
    if (action.type === "SET_SPOILER_VIEW") {
        return action.spoilers;
    }
    return spoilersValue || INITIAL_STATE.spoilers;
};
