import * as angular from "angular";
const template = require("./map-legend.html");

export const mapLegend: angular.IComponentOptions = {
    template: template,
    controllerAs: "vm",
    bindings: {
        icons: "<"
    }
};
