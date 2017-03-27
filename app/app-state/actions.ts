import { Route, Spoilers, SubRoutes, Combat } from "./states";
import { Action } from "redux";
import { Combatant } from "../combat/combatant.model";

export type ActionType =
    "SET_ROUTE" |
    "SET_SUB_ROUTES" |
    "ADD_SUB_ROUTE" |
    "RESET_SUB_ROUTE" |
    "BACK_SUB_ROUTE" |
    "SET_SPOILER_VIEW" |
    "SET_COMBAT";

export interface StateAction extends Action { type: ActionType; }

export interface RouteAction extends StateAction { route: Route; }

export interface SubRoutesAction extends StateAction {
    route: Route;
    subRoutes: number[] | number;
}

export interface SpoilersAction extends StateAction { spoilers: Spoilers; }

export interface CombatAction extends StateAction {
    combat: Combat;
    combatant: Combatant;
    existingIndex: number;
}

export function setRoute(route: Route): RouteAction { return { type: "SET_ROUTE", route }; }

export function setSubRoutes(route: Route, subRoutes: number[]): SubRoutesAction {
    return { type: "SET_SUB_ROUTES", route, subRoutes };
}

export function addSubRoute(route: Route, subRoute: number): SubRoutesAction {
    return { type: "ADD_SUB_ROUTE", route, subRoutes: subRoute };
}

export function resetSubRoutes(route: Route): SubRoutesAction {
    return { type: "RESET_SUB_ROUTE", route, subRoutes: null };
}

export function backSubRoute(route: Route): SubRoutesAction {
    return { type: "BACK_SUB_ROUTE", route, subRoutes: null };
}

export function setSpoilers(spoilers: Spoilers): SpoilersAction {
    return { type: "SET_SPOILER_VIEW", spoilers };
}

export function setCombat(combatants: Combatant[], turn: number, round: number): CombatAction {
    return { type: "SET_COMBAT", combat: { combatants, turn, round }, combatant: undefined, existingIndex: -1 };
}
