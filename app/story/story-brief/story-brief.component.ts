import {StoryModel} from "../story.model";

export class StoryBriefController {
    brief: StoryModel;

    hasFrom(): boolean { return !!(this.brief.from && this.brief.from.length); }

    hasTo(): boolean { return !!(this.brief.to && this.brief.to.length); }

    getStatusClass(): string {
        const status = this.getStatus();
        if (status === "incomplete") { return "md-disabled"; }
        if (status === "success") { return "md-accent"; }
        return "md-warn";
    }

    getStatusIcon(): string {
        const status = this.getStatus();
        if (status === "incomplete") { return ""; }
        if (status === "success") { return "done"; }
        return "error";
    }

    private getStatus(): string {
        if (!this.brief.complete) { return "incomplete"; }
        if (this.brief.complete && this.brief.success) { return "success"; }
        return "failure";
    }
}
