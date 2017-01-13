import * as angular from "angular";
import {Synopsis} from "./synopsis.model";

export class SynopsisService {

    constructor(private $http: angular.IHttpService) {}

    get(): angular.IPromise<Synopsis[]> {
        return this.$http.get("/synopses").then((response: { data: Synopsis[] }) => {
            return response.data.map(synopsis => new Synopsis(synopsis));
        });
    }
}
