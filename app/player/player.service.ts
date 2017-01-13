import {Player} from "./player.model";

export class PlayerService {

    constructor(private $http: angular.IHttpService) {}

    get(): angular.IPromise<Player[]> {
        return this.$http.get("/players").then((response: { data: Player[] }) => {
            return response.data.map(player => new Player(player));
        });
    }

    post(player: Player): angular.IPromise<Player> {
        return this.$http.post("/players", player).then((response: { data: Player }) => {
            return new Player(response.data);
        });
    }
}
