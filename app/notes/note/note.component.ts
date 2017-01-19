import {Entity} from "../../entities/entity.model";
import {Story} from "../../stories/story.model";
import {Note} from "../note.model";

interface NoteWindow extends angular.IWindowService {
    clickHandlers: (($event: MouseEvent) => void)[];
}

export class NoteController {
    note: Note;
    stories: Story[];
    entities: Entity[];
    maps = [];
    link: Story | Entity;
    editing: boolean;
    onNoteChange: (payload: { note: Note }) => void;
    noteField: HTMLElement;

    constructor(
        private $element: angular.IAugmentedJQuery
    ) {
        this.noteField = $element.find("p")[0];
    }

    cycleLinkType(): void {
        if (this.note.linkType === "story") {
            this.note.linkType = "entity";
        } else if (this.note.linkType === "entity") {
            this.note.linkType = "map";
        } else if (this.note.linkType === "map") {
            delete this.note.linkType;
        } else {
            this.note.linkType = "story";
        }
        this.setLink();
    }

    setLink(): void {
        const collectionMapping = {
            story: this.stories,
            entity: this.entities,
            map: void 0
        };
        const collection = collectionMapping[this.note.linkType];
        this.link = collection && collection.filter(linkable => {
            return linkable.id === this.note.linkId;
        });
    }

    showLinkableSelect(): boolean {
        return this.note && this.note.linkType && (
                (this.note.linkType === "story" && !!this.stories) ||
                (this.note.linkType === "entity" && !!this.entities) ||
                (this.note.linkType === "map" && !!this.maps)
            );
    }

    get linkableList(): Story[] | Entity[] {
        if (this.note.linkType === "story") {
            return this.stories;
        } else if (this.note.linkType === "entity") {
            return this.entities;
        }
    }

    linkableLabel(link: Story | Entity): string {
        if (link instanceof Story) {
            return link.title;
        } else if (link instanceof Entity) {
            return link.name;
        }
    }

    changeNote(): void {
        this.note.note = this.noteField.textContent;
        this.onNoteChange({ note: this.note });
    }
}
