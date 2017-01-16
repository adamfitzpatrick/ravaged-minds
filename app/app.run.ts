import * as angular from "angular";
import {loginService, LoginService} from "./login/login.service";
import {ACCESS_TOKEN_KEY} from "./player-access/player-access.service";

export function initRun(app: angular.IModule): void {
    /*app.run((loginService: LoginService) => {
        if (localStorage.getItem(ACCESS_TOKEN_KEY)))
        loginService("dm", "NerdMindsRavaged");
    });*/
}
