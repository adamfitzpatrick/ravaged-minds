export function combatStoreService() {
    return store => next => action => {
        return next(action);
    };
}
