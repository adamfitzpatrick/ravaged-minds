import {SynopsisService} from "../synopsis/synopsis.service";
import {Synopsis} from "../synopsis/synopsis.model";

export class BackgroundController {
    synopses: Synopsis[];

    constructor(private synopsisService: SynopsisService) {}

    $onInit(): void {
        this.synopsisService.get().then(this.loadSynopses);
    }

    getTitle(synopsis: Synopsis) { return synopsis.title.replace(/^the /i, ""); }

    private loadSynopses = (synopses: Synopsis[]) => {
        this.synopses = synopses;
    }
}
