import { options } from '../../list-option/types';
import { ContainerView } from '../../container/container';
import { View } from '../view';
import { ElementCreator } from '../../../utils/element-creator';
import { OptionList } from '../../list-option/optionList';
import { AddOptionButton } from '../../buttons/addOptionsBtn';
import { PasteListButton } from '../../buttons/pasteListBtn';
import { ClearListButton } from '../../buttons/clearListBtn';
import { SaveListButton } from '../../buttons/saveListToFileBtn';
import { LoadListButton } from '../../buttons/loadListFromFileBtn';
import { StartButton } from '../../buttons/startButton';
import { Modal } from '../../modal/modal';
import { SaveState } from '../../save-state/saveState';
import { FileLoader } from '../../file-loader.ts/fileLoader';
import { Router } from '../../router/router';

export class IndexView extends View {
    indexContainer: ContainerView;
    optionList: OptionList;
    fileLoader: FileLoader;
    addOptionBtn: AddOptionButton;
    pasteListBtn: PasteListButton;
    clearListBtn: ClearListButton;
    saveListToFileBtn: SaveListButton;
    loadListFromFileBtn: LoadListButton;
    startBtn: StartButton;
    saveState: SaveState;
    lastId: number;
    router: Router;

    constructor(router: Router) {
        const options: options = {
            tagName: 'section',
            classes: ['index'],
        };
        super(options);

        this.indexContainer = new ContainerView(['index__container']);
        this.setTitle(this.indexContainer.getHTMLElement());
        this.saveState = new SaveState();
        this.router = router;
        this.lastId = 1;
        this.optionList = new OptionList(this.indexContainer.getHTMLElement(), this.lastId);
        this.addOptionBtn = new AddOptionButton();
        this.pasteListBtn = new PasteListButton();
        this.clearListBtn = new ClearListButton();
        this.saveListToFileBtn = new SaveListButton();
        this.loadListFromFileBtn = new LoadListButton();
        this.startBtn = new StartButton(this.router);
        this.fileLoader = new FileLoader();

        this.configureMain();
    }

    private configureMain(): void {
        this.addInnerElements([this.indexContainer.getHTMLElement()]);
        const buttonContainer = new ContainerView(
            ['button__container'],
            this.indexContainer.getHTMLElement()
        ).getHTMLElement();
        this.addButons(buttonContainer);
        this.buttonsClickListeners(this.optionList.getHTMLElement());
        this.uploadFromLocalStorage(this.optionList, this.lastId);
    }

    private uploadFromLocalStorage(optionList: OptionList, id: number) {
        this.optionList.removeChildren();
        const data = this.saveState.initializeLocalStorage(optionList);
        if (data) {
            for (let i = 0; i < data.list.length; i++) {
                const id = data.list[i].id;
                const title = data.list[i].title;
                const weight = data.list[i].weight;
                this.optionList.addFilledOption(id, title, weight);
            }
        }
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
            const id = this.saveState.getLastId('add');
            if (id) {
                const newOption = this.addOptionBtn.handleClick(optionList, id);
                this.saveState.addToLocalStorage(newOption);
                optionList.scrollTop = optionList.scrollHeight;
            }
        });

        this.clearListBtn.getElement().addEventListener('click', () => {
            this.saveState.getLastId('clear');
            this.clearListBtn.handleClick(optionList);
            this.saveState.cleanStorage();
        });

        this.pasteListBtn.getElement().addEventListener('click', () => {
            const modal = new Modal();
            modal.open();
            modal.confirmButton.getElement().addEventListener('click', () => {
                const parsedData = modal.getParsedData();
                if (parsedData) {
                    for (let i = 0; i < parsedData.length; i++) {
                        let lastId = this.saveState.getLastId('add');
                        if (lastId) {
                            const id = lastId;
                            const title = parsedData[i].title;
                            const weight = parsedData[i].weight;
                            this.optionList.addFilledOption(lastId, title, String(weight));
                            this.saveState.saveInputData(id, title, String(weight));
                        }
                    }
                }
                modal.close();
            });
        });

        this.loadListFromFileBtn.getElement().addEventListener('click', () => {
            this.loadListFromFileBtn.handleClick(this.fileLoader, this.optionList);
        });

        this.startBtn.getElement().addEventListener('click', () => {
            this.startBtn.handleClick();
        });
    }
}
