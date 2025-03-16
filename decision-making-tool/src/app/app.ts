import { DecisionPicker } from './components/main/decision-picker/decision.picker';
import { IndexView } from './components/main/index/index';
import { MainView } from './components/main/mainView';
import { NotFoundView } from './components/main/not-found/not-found-view';
import { Pages } from './components/router/pages';
import { Route, Router } from './components/router/router';
import { View } from './utils/view';

export class App {
    router: Router;
    main: MainView | null;

    constructor() {
        this.main = null;
        const routes = this.createRoutes();
        this.router = new Router(routes);
        this.createView();
    }

    private createView(): void {
        this.main = new MainView();
        document.body.append(this.main.getHTMLElement());
    }

    private createRoutes(): Route[] {
        return [
            {
                path: ``,
                callback: () => {
                    const index = new IndexView(this.router);
                    this.setContent(index);
                },
            },
            {
                path: `${Pages.INDEX}`,
                callback: () => {
                    this.setContent(new IndexView(this.router));
                },
            },
            {
                path: `${Pages.DECISION_PICKER}`,
                callback: () => {
                    this.setContent(new DecisionPicker());
                },
            },
            {
                path: `${Pages.NOT_FOUND}`,
                callback: () => {
                    this.setContent(new NotFoundView());
                },
            },
        ];
    }

    private setContent(view: View): void {
        if (this.main !== null) {
            const HTMLElement = this.main.getHTMLElement();
            while (HTMLElement.firstChild) {
                HTMLElement.removeChild(HTMLElement.firstChild);
            }
            this.main.getHTMLElement().append(view.getHTMLElement());
        }
    }
}
