import {LoginService, LoginResponse} from "./login.service";
import {StoryService} from "../stories/story.service";
import {Story} from "../stories/story.model";
import {ACCESS_TOKEN_KEY, DM_SWITCH} from "../player-access/player-access.service";

export class LoginController {
    loading: boolean;
    password: string;

    constructor(
        private loginService: LoginService,
        private $location: angular.ILocationService,
        private storyService: StoryService
    ) {}

    $onInit(): void {
        if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
            this.storyService.get(1).then((response: Story) => {
                if (response) { this.$location.path("/story"); }
            });
        }
    }

    loginPlayer() { this.login("player", this.password); }

    loginDM() { this.login("dm", this.password); }

    private login(username: string, password: string): void {
        this.loading = true;
        this.loginService(username, password).then(this.handleResponse);
    }

    private handleResponse = (response: LoginResponse): void => {
        this.loading = false;
        if (response.status < 400) {
            this.$location.path("/story");
        }
    }
}
