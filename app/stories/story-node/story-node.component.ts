import {Story} from "../story.model";
import { NavService } from "../../nav/nav.service";

export class StoryNodeController {
    story: Story;
    onEnter: (payload: { id: number, left?: boolean, right?: boolean }) => void;

    constructor(private navService: NavService) {}

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

    gotoStory(story: Story): void { this.navService.gotoSubRoute("story", story.id); }
}
