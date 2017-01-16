import {LoginService, LoginResponse} from "./login.service";
import {StoryService} from "../stories/story.service";

export class LoginController {
    loading: boolean;
    loginError: boolean;
    password: string;

    constructor(
        private loginService: LoginService,
        private $location: angular.ILocationService,
        private storyService: StoryService
    ) {}

    loginPlayer() { this.login("player", this.password); }

    loginDM() { this.login("dm", this.password); }

    private login(username: string, password: string): void {
        this.loading = true;
        this.loginService(username, password).then(this.handleResponse, this.handleError);
    }

    private handleResponse = (): void => {
        this.loading = false;
        this.$location.path("/story");
        this.loginError = false;
    }

    private handleError = (): void => {
        this.loading = false;
        this.loginError = true;
        this.password = "";
    }
}
