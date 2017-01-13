import {Map} from "./map.model";

interface MapResponse { data: Map; }
interface MapsResponse { data: Map[]; }

export class MapService {

    constructor(private $http: angular.IHttpService) {}

    get(): angular.IPromise<Map[]>;
    get(mapId: number[]): angular.IPromise<Map[]>;
    get(mapId: number): angular.IPromise<Map>;
    get(mapId?: any): angular.IPromise<Map | Map[]> {
        let mapGet = "/maps";
        let mapsPromise;
        if (mapId instanceof Array) {
            mapGet += mapId.reduce((qryStr, id) => qryStr + `id=${id}&`, "?");
            mapsPromise = this.$http.get(mapGet);
        } else if (mapId) {
            return this.$http.get(`${mapGet}/${mapId}`)
                .then((response: MapResponse) => new Map(response.data));
        } else {
            mapsPromise = this.$http.get(mapGet);
        }
        return mapsPromise.then((response: MapsResponse) => {
            return response.data.map(map => new Map(map));
        });
    }

    post(map: Map) {
        return this.$http.post("/maps", map.getWriteableStory());
    }
}
