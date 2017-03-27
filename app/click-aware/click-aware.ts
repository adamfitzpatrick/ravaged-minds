import * as angular from "angular";
import { ClickAware } from "./click-aware.component";
const template = require("./click-aware.html");

export const clickAware: angular.IComponentOptions = {
    template,
    transclude: true,
    controller: ClickAware,
    bindings: {
        onBlur: "&"
    }
};
