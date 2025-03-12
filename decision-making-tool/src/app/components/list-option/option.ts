import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { DeleteButton } from '../buttons/deleteBtn';

export class Option {
    option: HTMLElement;
    id: HTMLElement | null;
    titleInput: HTMLInputElement | null | HTMLElement;
    weightInput: HTMLInputElement | null | HTMLElement;
    deleteBtn: DeleteButton;
    static currentId: number = 1;

    constructor(parent: HTMLElement) {
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
        this.createOptionElements();
        this.deleteBtnClickListener();
    }

    public getHTMLElement(): HTMLElement {
        return this.option;
    }

    public createOptionElements(): void {
        this.id = new ElementCreator({
            tagName: 'label',
            parent: this.option,
            textContent: `#${Option.currentId}`,
            classes: ['label'],
        }).getElement();

        this.titleInput = new ElementCreator<HTMLInputElement>({
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

    private deleteBtnClickListener(): void {
        this.deleteBtn.getElement().addEventListener('click', (MouseEvent) => {
            this.deleteBtn.handleClick(MouseEvent);
        });
    }
}
