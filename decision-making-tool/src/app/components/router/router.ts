import { HashRouterHandler } from './handler/hash-router-handler';
import { HistoryRouterHandler } from './handler/history-router-handler';
import { Pages, Route, UserRequest } from './types';

export class Router {
    routes: Route[];
    handler: HistoryRouterHandler;

    constructor(routes: Route[]) {
        this.routes = routes;

        this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

        document.addEventListener('DOMContentLoaded', () => {
            this.handler.navigate(history.state);
        });
    }

    public setHashHandler(): void {
        this.handler.disable();
        this.handler = new HashRouterHandler(this.urlChangedHandler.bind(this));
    }

    public navigate(url: string): void {
        this.handler.navigate(url);
    }

    private urlChangedHandler(request: UserRequest): void {
        const pathForFind = request.resource === '' ? request.path : `${request.path}/${''}`;
        const route = this.routes.find((item) => item.path === pathForFind);

        if (!route) {
            this.redirectToNotFoundPage();
            return;
        }

        route.callback(request.resource);
    }

    private redirectToNotFoundPage(): void {
        const notFoundPage = this.routes.find((item) => item.path === Pages.NOT_FOUND);
        if (notFoundPage) {
            this.navigate(notFoundPage.path);
        }
    }
}
