import { Pages } from './pages';

export type Route = {
    path: string;
    callback: () => void;
};

export type UserRequest = {
    path: string;
    resource: string;
};

export class Router {
    routes: Route[];

    constructor(routes: Route[]) {
        this.routes = routes;
        this.redirectToEmptyPage();
        document.addEventListener('DOMContentLoaded', () => {
            const path = this.getCurrentUrl();
            this.navigate(path);
        });
        window.addEventListener('popstate', this.browserChangeHandler.bind(this));
        window.addEventListener('hashchange', this.browserChangeHandler.bind(this));
    }

    private browserChangeHandler(): void {
        const url = this.getCurrentUrl();
        this.navigate(url);
    }

    private getCurrentUrl() {
        if (window.location.pathname) {
            return window.location.pathname.slice(1);
        } else {
            return window.location.hash.slice(1);
        }
    }

    public navigate(url: string) {
        const request = this.parseUrl(url);
        const finalPath = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
        const route = this.routes.find((elem) => elem.path === finalPath);

        if (!route) {
            this.redirectToEmptyPage();
            return;
        }

        route.callback();
    }

    private parseUrl(url: string): UserRequest {
        const result: UserRequest = { path: '', resource: '' };
        const path = url.split('/');
        [result.path = '', result.resource = ''] = path;
        return result;
    }

    private redirectToEmptyPage(): void {
        const routeEmptyPage = this.routes.find((elem) => elem.path === Pages.NOT_FOUND);

        if (routeEmptyPage) {
            this.navigate(routeEmptyPage.path);
        }
    }
}
