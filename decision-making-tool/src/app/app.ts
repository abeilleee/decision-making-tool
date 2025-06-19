import { MainView } from './main/mainView';
import { Pages } from './services/router/types';
import { Router } from './services/router/router';
import { View } from './main/view';
import { Route } from './services/router/types';

export class App {
    private router: Router;
    private main: MainView | null;

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
                callback: async (): Promise<void> => {
                    const { IndexView } = await import('./main/index/index');
                    this.setContent(new IndexView(this.router));
                },
            },
            {
                path: `${Pages.INDEX}`,
                callback: async (): Promise<void> => {
                    const { IndexView } = await import('./main/index/index');
                    this.setContent(new IndexView(this.router));
                },
            },
            {
                path: `${Pages.DECISION_PICKER}`,
                callback: async (): Promise<void> => {
                    const { DecisionPicker } = await import('./main/decision-picker/decision.picker');
                    this.setContent(new DecisionPicker(this.router));
                },
            },
            {
                path: `${Pages.NOT_FOUND}`,
                callback: async (): Promise<void> => {
                    const { NotFoundView } = await import('./main/not-found/not-found-view');
                    this.setContent(new NotFoundView(this.router));
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
