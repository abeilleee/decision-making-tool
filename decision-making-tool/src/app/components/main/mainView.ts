import { options } from '../../types';
import { ContainerView } from '../container/container';
import { View } from '../../utils/view';
import { ElementCreator } from '../../utils/element-creator';
import { OptionList } from '../list-option/optionList';
import { Option } from '../list-option/option';
import { AddOptionButton } from '../buttons/addOptionsBtn';
import { PasteListButton } from '../buttons/pasteListBtn';
import { ClearListButton } from '../buttons/clearListBtn';
import { SaveListButton } from '../buttons/saveListToFileBtn';
import { LoadListButton } from '../buttons/loadListFromFileBtn';
import { StartButton } from '../buttons/startButton';

export class MainView extends View {
    constructor() {
        const options: options = {
            tagName: 'main',
            parent: document.body,
            classes: ['main'],
        };

        super(options);
        this.configureMain();
    }

    private configureMain(): void {
        const mainContainer = new ContainerView(['main__container']).getHTMLElement();
        this.setTitle(mainContainer);
        const optionList = new OptionList(mainContainer).getHTMLElement();
        const option = new Option(optionList).getHTMLElement();
        this.addInnerElements([mainContainer]);
        const buttonContainer = new ContainerView(['button__container'], mainContainer);
        const addOptionBtn = new AddOptionButton().getElement();
        const pasteListBtn = new PasteListButton().getElement();
        const clearListBtn = new ClearListButton().getElement();
        const saveListToFileBtn = new SaveListButton().getElement();
        const loadListFromFileBtn = new LoadListButton().getElement();
        const startBtn = new StartButton().getElement();
        buttonContainer.addInnerElements([
            addOptionBtn,
            pasteListBtn,
            clearListBtn,
            saveListToFileBtn,
            loadListFromFileBtn,
            startBtn,
        ]);
    }

    private setTitle(parent: HTMLElement): HTMLElement {
        const options: options = {
            tagName: 'h1',
            classes: ['title'],
            parent: parent,
            textContent: 'Decision Making Tool',
        };

        return new ElementCreator(options).getElement();
    }
}
