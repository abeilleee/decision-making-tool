import { MainView } from './components/main/mainView';
import { Pages } from './components/router/types';
import { Router } from './components/router/router';
import { View } from './components/main/view';
import { Route } from './components/router/types';

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
                callback: async () => {
                    const { IndexView } = await import('./components/main/index/index');
                    this.setContent(new IndexView(this.router));
                },
            },
            {
                path: `${Pages.INDEX}`,
                callback: async () => {
                    const { IndexView } = await import('./components/main/index/index');
                    this.setContent(new IndexView(this.router));
                },
            },
            {
                path: `${Pages.DECISION_PICKER}`,
                callback: async () => {
                    const { DecisionPicker } = await import('./components/main/decision-picker/decision.picker');
                    this.setContent(new DecisionPicker(this.router));
                },
            },
            {
                path: `${Pages.NOT_FOUND}`,
                callback: async () => {
                    const { NotFoundView } = await import('./components/main/not-found/not-found-view');
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
