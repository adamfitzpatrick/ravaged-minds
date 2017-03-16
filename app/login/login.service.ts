import * as angular from "angular";
import { SpoilerService } from "../spoiler/spoiler.service";

export const ACCESS_TOKEN_KEY = "RAVAGEDMINDS_ACCESSTOKEN";
export const USERNAME = "RAVAGEDMINDS_USERNAME";

export type Username = "player" | "dm";

export interface LoginResponse {
    data: {
        token: string,
        username: Username
    };
    status: number;
}

export interface LoginService { (username: string, password: string): angular.IHttpPromise<{}>; }

export function loginService(
    $http: angular.IHttpService,
    spoilerService: SpoilerService
) {
    const handleResponse = (response: LoginResponse) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
        localStorage.setItem(USERNAME, response.data.username);
        if (response.data.username === "dm") {
            spoilerService.dmMode = true;
            spoilerService.showSpoilers = true;
        }
        delete response.data.token;
        return response;
    };

    return (username: string, password: string): angular.IHttpPromise<{}> => {
        return $http.post("/login", { username, password }).then(handleResponse);
    };
}
