import * as angular from "angular";
/* tslint:disable:no-string-literal */
window["ngRoute"] = "ngRoute";
window["ngAnimate"] = "ngAnimate";
window["ngMaterial"] = "ngMaterial";

import "./app.scss";
import "angular-route";
import {initConfig} from "./app.config";
import {initRoutes} from "./app.route";
import {initComponents} from "./app.component";
import {initServices} from "./app.service";

const app = angular.module("App", [
    "ngRoute",
    "ngAnimate",
    "ngMaterial"
]);

// Initialize Angular constants based on app-config.json
// CONFIG is injected at compile-time by webpack.DefinePlugin
declare const CONFIG: Object;
Object.keys(CONFIG).forEach(key => app.constant(key, CONFIG[key]));
declare const STATIC: Object;
app.constant("STATIC", STATIC);


initConfig(app);
initRoutes(app);
initComponents(app);
initServices(app);

export default app;
export const ng = angular;
