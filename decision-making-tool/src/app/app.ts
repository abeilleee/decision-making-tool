import { HeaderView } from './view/header/header';
import { MainView } from './view/main/mainView';
import { ButtonContainer } from './components/buttons/buttonContainer';
import { addOptionBtn } from './components/buttons/addOptionsBtn';
import { clearListBtn } from './components/buttons/clearListBtn';
import { loadListFromFileBtn } from './components/buttons/loadListFromFileBtn';
import { pasteListBtn } from './components/buttons/pasteListBtn';
import { saveListToFileBtn } from './components/buttons/saveListToFileBtn';
import { startBtn } from './components/buttons/start';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const header = new HeaderView().getHTMLElement();
        const main = new MainView().getHTMLElement();
        const buttonContainer = new ButtonContainer([
            addOptionBtn,
            pasteListBtn,
            clearListBtn,
            saveListToFileBtn,
            loadListFromFileBtn,
            startBtn,
        ]).getElement();
    }
}
