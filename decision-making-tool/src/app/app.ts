import { HeaderView } from './view/header/header';
import { MainView } from './view/main/mainView';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const header = new HeaderView().getHTMLElement();
        const main = new MainView().getHTMLElement();
    }
}
