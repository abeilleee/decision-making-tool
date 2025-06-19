import { SaveState } from '../saveState';
import { NUMBERS } from '../../components/wheel/constants';
import { HistoryRoutesHandler } from './historyRoutesHandler';
import { Pages, Route, UserRequest } from './types';

export class Router {
    public routes: Route[];
    private handler: HistoryRoutesHandler;

    constructor(routes: Route[]) {
        this.routes = routes;
        this.handler = new HistoryRoutesHandler(this.urlHandler.bind(this));

        document.addEventListener('DOMContentLoaded', () => {
            const state: string | Event | PopStateEvent = history.state;
            this.handler.navigate(state);
            this.redirectToIndexPage();
        });
    }

    public navigate(url: string): void {
        this.handler.navigate(url);
    }

    public redirectToIndexPage(): void {
        const saveState = new SaveState();
        const filledOptions = saveState.getFilledOptions();
        const path = window.location.pathname;
        if (filledOptions.length < +NUMBERS.HALF && path === `/${Pages.DECISION_PICKER}`) {
            this.navigate(Pages.INDEX);
        }
    }

    private redirectToNotFoundPage(): void {
        const targetPath: string = Pages.NOT_FOUND;
        const notFoundPage = this.routes.find((elem) => elem.path === targetPath);
        if (notFoundPage) {
            this.navigate(notFoundPage.path);
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
