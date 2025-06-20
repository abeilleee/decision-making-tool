import { options } from './types';
import { View } from '../../view/view';
import { Option } from './option';

export class OptionList extends View {
    private currentId: number;

    constructor(parent: HTMLElement, currentId: number) {
        const options: options = {
            tagName: 'ul',
            parent: parent,
            classes: ['option-list'],
        };
        super(options);
        this.currentId = currentId;
    }

    public addFilledOption(id: number, title: string, weight: string): void {
        const parent = this.element.getElement();
        const newOption = new Option(parent, Number(this.currentId));
        if (newOption)
            if (newOption.titleInput instanceof HTMLInputElement && newOption.weightInput instanceof HTMLInputElement) {
                if (newOption.id) {
                    newOption.id.textContent = `#${id}`;
                    newOption.titleInput.value = title;
                    newOption.weightInput.value = String(weight);
                }
            }
    }

    public removeChildren(): void {
        while (this.element.getElement().firstChild) {
            const child = this.element.getElement().firstChild;
            if (child) {
                this.element.getElement().removeChild(child);
            }
        }
    }
}
