import {Note, LinkType} from "./note.model";

export type NotePromise = angular.IPromise<Note>;
export type NotesPromise = angular.IPromise<Note[]>;

export class NoteService {

    constructor(private $http: angular.IHttpService) {}

    get(): NotesPromise;
    get(id: string): NotePromise;
    get(ids: string[]): NotesPromise;
    get(linkId: number, linkType: LinkType);
    get(linkType: LinkType): NotesPromise;
    get(arg?: any, linkType?: LinkType): NotePromise | NotesPromise {
        let url = "/notes";
        if (arg instanceof Array) {
            url += arg.reduce((queryString, id) => queryString + `id=${id}&`, "?");
        } else if (linkType) {
            url += `?linkId=${arg}&linkType=${linkType}`;
        } else {
            url += `/${arg || ""}`;
        }
        return this.$http.get(url).then((response: { data: Note | Note[] }) => {
            if (response.data instanceof Array) {
                return response.data.map(note => new Note(note));
            }
            return new Note(response.data);
        });
    }

    post(note: Note): angular.IHttpPromise<Note> {
        return this.$http.post("/notes", note).then((response: { data: Note }) => response.data);
    }

    delete(note: Note): angular.IHttpPromise<{}> {
        return this.$http.delete(`/notes/${note._id}`);
    }
}
