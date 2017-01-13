import {NoteService} from "../note.service";
import {Note, LinkType} from "../note.model";
import {Entity} from "../../entities/entity.model";
import {Story} from "../../stories/story.model";
import {StoryService} from "../../stories/story.service";
import {EntityService} from "../../entities/entity.service";

export class NotesController {
    linkId: number;
    linkType: LinkType;
    notes: Note[];
    stories: Story[];
    entities: Entity[];
    maps = [];
    showControls: boolean = false;
    selectedNote: Note;
    typeFilter: LinkType;
    showLoader: boolean = true;

    constructor(
        private noteService: NoteService,
        private storyService: StoryService,
        private entityService: EntityService,
        private $scope: angular.IScope
    ) {}

    $onInit(): void {
        if (!this.linkType) {
            this.noteService.get().then(this.loadNotes);
            this.storyService.get().then(this.loadStories);
            this.entityService.get().then(this.loadEntities);
        }
        this.$scope.$watch(() => this.linkId, () => {
            this.noteService.get(this.linkId, this.linkType).then(this.loadNotes);
        });
    }

    get filteredNotes(): Note[] {
        if (!this.typeFilter) { return this.notes; }
        return this.notes.filter(note => note.linkType === this.typeFilter);
    }

    setShowControls(showControls: boolean): void { this.showControls = showControls; }

    setSelectedNote(note: Note): void {
        this.selectedNote = note;
    }

    setTypeFilter(type: LinkType): void { this.typeFilter = type; }

    addNote(): void {
        this.saveNote(new Note("", this.linkId, this.linkType));
    }

    saveNote = (note: Note) => {
        this.showLoader = true;
        this.noteService.post(note).then(this.handleResponse);
    }

    deleteNote() {
        this.showLoader = true;
        this.noteService.delete(this.selectedNote).then(this.handleResponse);
    }

    private loadNotes = (notes: Note[]) => {
        this.showLoader = false;
        this.notes = notes;
    }

    private handleResponse = (): void => {
        this.noteService.get(this.linkId, this.linkType).then(this.loadNotes);
    }

    private loadStories = (stories: Story[]): void => {
        this.stories = stories;
    }

    private loadEntities = (entities: Entity[]): void => {
        this.entities = entities;
    }
}
