export class StoryModel {
    id: number;
    major: boolean;
    activities: string[];
    from: number[];
    to: number[];
    title: string;
    tagline: string;
    synopsis: string;
    complete: boolean;
    completed?: Date;
    success?: boolean;

    constructor(storyObj: StoryModel) {
        this.id = storyObj.id;
        this.major = storyObj.major;
        this.activities = storyObj.activities;
        this.from = storyObj.from;
        this.to = storyObj.to;
        this.title = storyObj.title;
        this.tagline = storyObj.tagline;
        this.synopsis = storyObj.synopsis;
        this.complete = storyObj.complete;
        this.completed = storyObj.completed;
        this.success = storyObj.success;
    }

    get connectors(): string {
        return `(${this.from.toString()}).(${this.to.toString()}`;
    }
}
