import * as angular from "angular";
import {
    ACCESS_TOKEN_KEY, PlayerAccessService,
    DM_SWITCH
} from "../player-access/player-access.service";

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

    return (username: string, password: string): angular.IHttpPromise<{}> => {

        return $http.post("/login", { username, password }).then((response: LoginResponse) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);
            if (response.data.username === "dm") {
                localStorage.setItem(DM_SWITCH, "true");
                playerAccessService.setDm(true);
            }
            delete response.data.token;
            return response;
        });
    };
}
