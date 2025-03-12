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
    mainContainer: ContainerView;
    optionList: OptionList;
    addOptionBtn: AddOptionButton;
    pasteListBtn: PasteListButton;
    clearListBtn: ClearListButton;
    saveListToFileBtn: SaveListButton;
    loadListFromFileBtn: LoadListButton;
    startBtn: StartButton;

    constructor() {
        const options: options = {
            tagName: 'main',
            parent: document.body,
            classes: ['main'],
        };
        super(options);
        this.mainContainer = new ContainerView(['main__container']);
        this.setTitle(this.mainContainer.getHTMLElement());
        this.optionList = new OptionList(this.mainContainer.getHTMLElement());
        this.addOptionBtn = new AddOptionButton();
        this.pasteListBtn = new PasteListButton();
        this.clearListBtn = new ClearListButton();
        this.saveListToFileBtn = new SaveListButton();
        this.loadListFromFileBtn = new LoadListButton();
        this.startBtn = new StartButton();
        this.configureMain();
    }

    private configureMain(): void {
        this.addOption(this.optionList.getHTMLElement());
        this.addInnerElements([this.mainContainer.getHTMLElement()]);
        const buttonContainer = new ContainerView(
            ['button__container'],
            this.mainContainer.getHTMLElement()
        ).getHTMLElement();
        this.addButons(buttonContainer);
        this.buttonsClickListeners(this.optionList.getHTMLElement());
    }

    private addOption(parent: HTMLElement) {
        return new Option(parent);
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

    private addButons(parent: HTMLElement): void {
        const buttons = [
            this.addOptionBtn.getElement(),
            this.pasteListBtn.getElement(),
            this.clearListBtn.getElement(),
            this.saveListToFileBtn.getElement(),
            this.loadListFromFileBtn.getElement(),
            this.startBtn.getElement(),
        ];
        buttons.forEach((button) => parent.append(button));
    }

    private buttonsClickListeners(optionList: HTMLElement): void {
        this.addOptionBtn.getElement().addEventListener('click', () => {
            let currentId = Option.currentId++;
            currentId++;
            this.addOptionBtn.handleClick(currentId, Option.currentId, optionList);
        });

        this.clearListBtn.getElement().addEventListener('click', () => {
            let currentId = Option.currentId;
            currentId = 0;
            this.clearListBtn.handleClick(optionList);
        });

        this.pasteListBtn.getElement().addEventListener('click', () => {
            this.pasteListBtn.handleClick();
        });
    }
}
