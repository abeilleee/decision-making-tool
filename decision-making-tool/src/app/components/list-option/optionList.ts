import { options } from '../../types';
import { View } from '../../utils/view';
import { Option } from './option';

export class OptionList extends View {
    constructor(parent: HTMLElement) {
        const options: options = {
            tagName: 'ul',
            parent: parent,
            classes: ['option-list'],
        };
        super(options);
    }

    public addFilledOption(currentId: number, title: string, weight: number): void {
        const parent = this.element.getElement();
        const newOption = new Option(parent);
        if (newOption)
            if (newOption.titleInput instanceof HTMLInputElement && newOption.weightInput instanceof HTMLInputElement) {
                Option.currentId = currentId;
                newOption.titleInput.value = title;
                newOption.weightInput.value = String(weight);
            }
    }
}
