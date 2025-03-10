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
        this.addOption(optionList);
        this.addInnerElements([mainContainer]);
        const buttonContainer = new ContainerView(['button__container'], mainContainer).getHTMLElement();
        this.addButons(buttonContainer, optionList);
    }

    public addOption(parent: HTMLElement) {
        const option = new Option(parent).getHTMLElement();
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

    private addButons(parent: HTMLElement, optionList: HTMLElement) {
        const addOptionBtn = new AddOptionButton();
        const pasteListBtn = new PasteListButton();
        const clearListBtn = new ClearListButton();
        const saveListToFileBtn = new SaveListButton();
        const loadListFromFileBtn = new LoadListButton();
        const startBtn = new StartButton();
        const buttons = [
            addOptionBtn.getElement(),
            pasteListBtn.getElement(),
            clearListBtn.getElement(),
            saveListToFileBtn.getElement(),
            loadListFromFileBtn.getElement(),
            startBtn.getElement(),
        ];
        buttons.forEach((button) => parent.append(button));
        addOptionBtn.getElement().addEventListener('click', () => {
            addOptionBtn.handleClick(optionList, new Option(optionList).getHTMLElement());
        });
    }
}
