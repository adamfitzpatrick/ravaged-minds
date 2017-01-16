import * as angular from "angular";
import {ACCESS_TOKEN_KEY} from "./login/login.service";

export function initRun(app: angular.IModule): void {
    app.run(($location: angular.ILocationService) => {
        if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
            $location.path("/login");
        }
    });
}
