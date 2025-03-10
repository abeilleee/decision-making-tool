import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { Button } from '../buttons/button';
import { DeleteButton } from '../buttons/deleteBtn';

export class Option {
    option: HTMLElement;

    constructor(parent: HTMLElement) {
        const options: options = {
            tagName: 'li',
            classes: ['option'],
            parent: parent,
        };

        this.option = new ElementCreator(options).getElement();
        this.createOptionElements();
    }

    public getHTMLElement(): HTMLElement {
        return this.option;
    }

    public createOptionElements(): void {
        const id: HTMLElement = new ElementCreator({
            tagName: 'label',
            parent: this.option,
            textContent: '#111111111',
            classes: ['label'],
        }).getElement();

        const titleInput: HTMLElement = new ElementCreator({
            tagName: 'input',
            parent: this.option,
            classes: ['input'],
        }).getElement();

        const weightInput: HTMLElement = new ElementCreator({
            tagName: 'input',
            parent: this.option,
            classes: ['input'],
        }).getElement();

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
}
