import * as angular from "angular";
import {Synopsis} from "../synopsis.model";

export class SynopsisController {
    synopsis: Synopsis;
    synopsisContent: String;
    expanded: boolean = false;

    constructor(private $sce: angular.ISCEService) {}

    $onInit(): void {
        this.synopsisContent = this.$sce.trustAsHtml(this.synopsis.content);
    }

    toggle(): void { this.expanded = !this.expanded; }
}
