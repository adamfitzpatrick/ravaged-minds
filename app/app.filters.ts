import * as angular from "angular";

export function initFilters(app: angular.IModule) {
    function capitalize(str: string) {
        if (!str) { return; }
        return `${str[0].toUpperCase()}${str.slice(1)}`;
    }

    app.filter("capitalize", () => capitalize);
}
