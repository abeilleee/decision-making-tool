import { MainView } from './components/main/mainView';
import { Modal } from './components/modal/modal';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const main = new MainView().getHTMLElement();
        // const modal = new Modal().open();
    }
}
