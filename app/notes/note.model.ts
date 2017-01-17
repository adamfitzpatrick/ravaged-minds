export type LinkType = "entity" | "story" | "map";

const LINK_TYPE_ICONS = {
    story: "security",
    entity: "accessibility",
    map: "location_on"
};

export class Note {
    // tslint:disable:variable-name
    _id: string;
    note: string;
    date: Date;
    linkId: number;
    linkType: LinkType;

    constructor(note: string, linkId: number, linkType: LinkType);
    constructor(note: Note);
    constructor(note: any, linkId?: number, linkType?: LinkType) {
        if (note._id) {
            this._id = note._id;
            this.note = note.note;
            this.linkType = note.linkType;
            this.linkId = note.linkId;
        } else {
            this.note = note;
            this.linkId = linkId;
            this.linkType = linkType;
        }
        if (!note.date) {
            this.date = new Date();
        } else {
            this.date = new Date(note.date);
        }
    }

    get dateTimeString(): string {
        const d = `${this.date.getMonth() + 1}/${this.date.getDate()}/${this.date.getFullYear()}`;
        const t = `${this.date.getHours()}:${this.date.getMinutes()}`;
        return `${d} ${t}`;
    }

    get linkTypeIcon(): string {
        return LINK_TYPE_ICONS[this.linkType];
    }
}
