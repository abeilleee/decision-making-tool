import { MainView } from './components/main/mainView';
import { ButtonContainer } from './components/buttons/buttonContainer';
import { Option } from './components/list-option/option';
import { ContainerView } from './components/container/container';
import { OptionList } from './components/list-option/optionList';

export class App {
    constructor() {
        this.createView();
    }

    createView() {
        const main = new MainView().getHTMLElement();
    }
}
