import {StoryModel} from "../story.model";

export class StoryNodeController {
    story: StoryModel;
    onEnter: (payload: { id: number, left?: boolean, right?: boolean }) => void;

    getNodeType(): string {
        if (this.story.major) {
            return "story-node--major md-warn";
        }
        return "story-node--minor md-primary";
    }

    onMouseOver($event: MouseEvent): void {
        const left = ($event.target as HTMLElement).getBoundingClientRect().left > 700;
        this.onEnter({ id: this.story.id, left: left });
    }
}
