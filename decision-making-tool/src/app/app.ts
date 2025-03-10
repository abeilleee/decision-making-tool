import { MainView } from './view/main/mainView';
import { ButtonContainer } from './components/buttons/buttonContainer';
import { addOptionBtn } from './components/buttons/addOptionsBtn';
import { clearListBtn } from './components/buttons/clearListBtn';
import { loadListFromFileBtn } from './components/buttons/loadListFromFileBtn';
import { pasteListBtn } from './components/buttons/pasteListBtn';
import { saveListToFileBtn } from './components/buttons/saveListToFileBtn';
import { startBtn } from './components/buttons/start';
import { TitleView } from './view/main/title';
import { Option } from './components/list-option/option';
import { ContainerView, mainContainer } from './view/container/container';
import { OptionList } from './components/list-option/optionList';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const main = new MainView().getHTMLElement();
        const title = new TitleView().getHTMLElement();
        const optionContainer = new ContainerView(['option__container'], mainContainer).getHTMLElement();
        const optionList = new OptionList(optionContainer).getHTMLElement();
        const option = new Option(optionList);
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
