import * as angular from "angular";
import {PlayerAccessService} from "../player-access/player-access.service";

export const ACCESS_TOKEN_KEY = "RAVAGEDMINDS_ACCESSTOKEN";
export const USERNAME = "RAVAGEDMINDS_USERNAME";

export interface LoginResponse {
    data: {
        token: string,
        username: "player" | "dm"
    };
    status: number;
}
export interface LoginService { (username: string, password: string): angular.IHttpPromise<{}>; }

export function loginService(
    $http: angular.IHttpService,
    playerAccessService: PlayerAccessService
) {
    const handleResponse = (response: LoginResponse) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
        localStorage.setItem(USERNAME, response.data.username);
        if (response.data.username === "dm") {
            playerAccessService.dm = true;
            playerAccessService.dmSwitch = true;
        } else {
            playerAccessService.dm = false;
            playerAccessService.dmSwitch = false;
        }
        delete response.data.token;
        return response;
    };

    return (username: string, password: string): angular.IHttpPromise<{}> => {

        return $http.post("/login", { username, password }).then(handleResponse);
    };
}
