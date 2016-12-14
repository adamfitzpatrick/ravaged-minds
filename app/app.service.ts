import * as angular from "angular";
import {staticDataService} from "./services/static-data/static-data.service";

export function initServices(app: angular.IModule) {
    app.service("staticDataService", staticDataService);
}
