export class Synopsis {
    id: number;
    title: string;
    content: string;

    constructor(synopsis: Synopsis) {
        this.id = synopsis.id;
        this.title = synopsis.title;
        this.content = synopsis.content;
    }
}
