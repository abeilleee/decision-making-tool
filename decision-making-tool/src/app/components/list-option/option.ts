import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { Button } from '../buttons/button';
import { DeleteButton } from '../buttons/deleteBtn';

export class Option {
    option: HTMLElement;
    id: HTMLElement | null;
    titleInput: HTMLInputElement | null | HTMLElement;
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
        this.createOptionElements();
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

        const weightInput: Partial<HTMLInputElement> = new ElementCreator({
            tagName: 'input',
            parent: this.option,
            classes: ['input', 'input__weight'],
        }).getElement();
        weightInput.placeholder = 'Weight';
        weightInput.type = 'number';

        const deleteBtn = new DeleteButton();
        this.option.append(deleteBtn.getElement());
        deleteBtn.getElement().addEventListener('click', () => {
            const parentElement = this.option.parentElement;
            console.log(parentElement);
            if (parentElement && parentElement instanceof HTMLElement) {
                deleteBtn.handleClick(parentElement);
            }
        });
    }

    addTitle(value: string) {
        if (this.titleInput instanceof HTMLInputElement) {
            this.titleInput.value = value;
        }
    }

    increaseId() {
        Option.currentId++;
    }
}
