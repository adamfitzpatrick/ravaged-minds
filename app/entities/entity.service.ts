import {Entity} from "./entity.model";

export class EntityService {

    constructor(private $http: angular.IHttpService) {}

    get(): angular.IPromise<Entity[]>;
    get(id: number): angular.IPromise<Entity>;
    get(ids: number[]): angular.IPromise<Entity[]>;
    get(arg?: any): any {
        const ids = arg as number[];
        if (ids && ids.length) {
            return this.getQuery(ids);
        } else {
            return this.getOneOrAll(arg);
        }
    }

    post(entity: Entity): angular.IHttpPromise<{}> {
        return this.$http.post("/entities", entity.getWriteableEntity());
    }

    private getOneOrAll(id?: number | string): angular.IPromise<Entity[] | Entity> {
        id = id || "";
        return this.$http.get(`/entities/${id}`).then(this.extractData);
    }

    private makeQuery(ids: number[]): string {
        return ids.reduce((query: string, id: number) => {
            query += `id=${id}&`;
            return query;
        }, "?");
    }

    private getQuery(ids: number[]): angular.IPromise<Entity[]> {
        return this.$http.get(`/entities/${this.makeQuery(ids)}`).then(this.extractData);
    }

    private extractData(response: { data: Entity[] | Entity }): Entity[] | Entity {
        if (response.data instanceof Array) {
            return (response.data as Entity[]).map(entity => new Entity(entity));
        } else {
            return new Entity(response.data as Entity);
        };
    }
}
