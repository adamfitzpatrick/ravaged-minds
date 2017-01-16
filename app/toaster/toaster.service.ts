export interface ToasterService { (test: string, duration?: number): void; }

export function toasterService ($injector: angular.auto.IInjectorService): ToasterService {
    return (text: string, duration?: number) => {
        const $mdToast = $injector.get("$mdToast") as angular.material.IToastService;
        $mdToast.show($mdToast.simple()
            .textContent(text)
            .position("bottom")
            .hideDelay(duration || 5000));
    };
}
