import { MainView } from './components/main/mainView';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const main = new MainView().getHTMLElement();
        // const modal = new Modal().open();
    }
}
