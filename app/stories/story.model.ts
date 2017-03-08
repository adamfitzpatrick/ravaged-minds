export const STATUS_CLASSES = {
    success: "md-accent",
    failure: "md-warn",
    incomplete: "md-primary"
};

export const STATUS_ICONS = {
    success: "done",
    failure: "close",
    incomplete: "security"
};

export type StoryStatus = "incomplete" | "success" | "failure";

export class Story {

    static WRITEABLE_FIELDS = [ "complete", "completed", "success" ];

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
    entities: number[];
    maps: number[];
    content: string;

    constructor(storyObj: Story) {
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
        this.entities = storyObj.entities;
        this.maps = storyObj.maps;
        this.content = storyObj.content;
    }

    get connectors(): string {
        return `(${this.from.toString()}).(${this.to.toString()}`;
    }

    get status(): StoryStatus {
        if (!this.complete) { return "incomplete"; }
        if (this.success) { return "success"; }
        return "failure";
    }

    get statusClass(): string {
        return STATUS_CLASSES[this.status];
    }

    get statusIcon(): string {
        return STATUS_ICONS[this.status];
    }

    get hasFrom(): boolean { return !!this.from && !!this.from.length; }

    get hasTo(): boolean { return !!this.to && !!this.to.length; }

    getWriteableStory(): Story {
        const writeable = { id: this.id };
        Story.WRITEABLE_FIELDS.forEach(field => writeable[field] = this[field]);
        return writeable as Story;
    }
}
