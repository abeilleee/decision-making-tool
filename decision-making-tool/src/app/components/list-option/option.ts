import { options } from './types';
import { ElementCreator } from '../../utils/element-creator';
import { DeleteButton } from '../buttons/deleteBtn';
import { SaveState } from '../../services/saveState';

export class Option {
    public titleInput: HTMLInputElement | null | HTMLElement;
    public id: HTMLElement | null;
    public weightInput: HTMLInputElement | null | HTMLElement;
    private option: HTMLElement | HTMLLIElement;
    private deleteBtn: DeleteButton;
    private saveState: SaveState;
    private lastId: number;

    constructor(parent: HTMLElement, id: number) {
        const options: options = {
            tagName: 'li',
            classes: ['option'],
            parent: parent,
        };

        this.option = new ElementCreator(options).getElement();
        this.id = null;
        this.titleInput = null;
        this.weightInput = null;
        this.deleteBtn = new DeleteButton();
        this.lastId = Number(id);
        this.createOptionElements();
        this.deleteBtnClickListener();
        this.saveState = new SaveState();
        this.inputListeners();
    }

    public getHTMLElement(): HTMLElement {
        return this.option;
    }

    public createOptionElements(): void {
        this.id = new ElementCreator({
            tagName: 'label',
            parent: this.option,
            textContent: `#${this.lastId}`,
            classes: ['label'],
        }).getElement();

        this.titleInput = new ElementCreator({
            tagName: 'input',
            parent: this.option,
            classes: ['input', 'input__title'],
        }).getElement();
        if (this.titleInput instanceof HTMLInputElement) {
            this.titleInput.placeholder = 'Title';
        }

        this.weightInput = new ElementCreator({
            tagName: 'input',
            parent: this.option,
            classes: ['input', 'input__weight'],
        }).getElement();
        if (this.weightInput instanceof HTMLInputElement) {
            this.weightInput.placeholder = 'Weight';
            this.weightInput.type = 'number';
        }

        this.option.append(this.deleteBtn.getElement());
    }

    public deleteBtnClickListener(): void {
        this.deleteBtn.getElement().addEventListener('click', (MouseEvent) => {
            this.deleteBtn.handleClick(MouseEvent);
            this.saveState.getLastId('delete');
        });
    }

    private inputListeners(): void {
        const elements = [this.titleInput, this.weightInput];
        for (let i = 0; i < elements.length; i++) {
            const input = elements[i];
            if (input)
                input.addEventListener('input', () => {
                    const id = Number(input?.parentElement?.firstChild?.textContent?.slice(1));
                    const savedDate = this.saveState.getData();
                    const savedListOptions = savedDate.list;
                    const obj = savedListOptions.find((obj) => Number(obj.id) === id);
                    let title;
                    let weight;
                    if (input instanceof HTMLInputElement && obj) {
                        if (input === this.titleInput) {
                            title = input.value;
                            obj.title = title ? title : '';
                        } else if (input === this.weightInput) {
                            weight = input.value;
                            obj.weight = weight ? weight : '';
                        }
                    }
                    localStorage.setItem(this.saveState.storageName, JSON.stringify(savedDate));
                });
        }
    }
}
