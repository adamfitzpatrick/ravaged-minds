import {Story} from "../story.model";

export class StoryNodeController {
    story: Story;
    onEnter: (payload: { id: number, left?: boolean, right?: boolean }) => void;

    getNodeType(): string {
        if (this.story.major) {
            return "story-node--major";
        }
        return "story-node--minor";
    }

    onMouseOver($event: MouseEvent): void {
        const left = ($event.target as HTMLElement).getBoundingClientRect().left > 700;
        this.onEnter({ id: this.story.id, left });
    }
}
