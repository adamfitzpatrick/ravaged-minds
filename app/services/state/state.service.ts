export class StateService {
    applicationState: Object = {};
    statePermanence: Object = {};
    prevState: string;

    setState(navItem: string, state?: Object, permanent?: boolean) {
        this.prevState = navItem;
        if (state) { this.applicationState[navItem] = state; }
        this.statePermanence[navItem] = permanent;
    }

    getState(navItem: string) { return this.applicationState[navItem]; }

    clearState(navItem: string, force?: true) {
        if (!this.statePermanence[navItem] || force) {
            delete this.applicationState[navItem];
        }
    }
}
