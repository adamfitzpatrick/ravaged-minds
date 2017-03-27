import * as angular from "angular";

export function initFilters(app: angular.IModule) {
    function capitalize(str: string) {
        if (!str) { return; }
        return `${str[0].toUpperCase()}${str.slice(1)}`;
    }

    app.filter("capitalize", () => capitalize);

    function floor(str: string) {
        const value = parseInt(str, 10);
        if (!str || value !== value) { return str; }
        return value;
    }

    app.filter("floor", () => floor);
}
