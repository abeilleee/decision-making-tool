import { SaveState } from '../saveState';
import { NUMBERS } from '../../components/wheel/constants';
import { HistoryRoutesHandler } from './historyRoutesHandler';
import { Pages, Route, UserRequest } from './types';

export class Router {
    routes: Route[];
    handler: HistoryRoutesHandler;

    constructor(routes: Route[]) {
        this.routes = routes;
        this.handler = new HistoryRoutesHandler(this.urlHandler.bind(this));

        document.addEventListener('DOMContentLoaded', () => {
            this.handler.navigate(history.state);
            this.redirectToIndexPage();
        });
    }

    public navigate(url: string): void {
        this.handler.navigate(url);
    }

    private redirectToNotFoundPage(): void {
        const notFoundPage = this.routes.find((elem) => elem.path === Pages.NOT_FOUND);
        if (notFoundPage) {
            this.navigate(notFoundPage.path);
        }
    }

    public redirectToIndexPage(): void {
        const saveState = new SaveState();
        const filledOptions = saveState.getFilledOptions();
        const path = window.location.pathname;
        if (filledOptions.length < NUMBERS.HALF && path === `/${Pages.DECISION_PICKER}`) {
            this.navigate(Pages.INDEX);
        }
    }

    private urlHandler(request: UserRequest): void {
        const targetPath = request.path;
        const route = this.routes.find((elem) => elem.path === targetPath);
        if (!route) {
            this.redirectToNotFoundPage();
            return;
        }
        route.callback(request.resource);
    }
}
