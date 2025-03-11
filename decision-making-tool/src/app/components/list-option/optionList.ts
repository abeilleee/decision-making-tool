import { options } from '../../types';
import { View } from '../../utils/view';

export class OptionList<HTMLUListElement> extends View {
    constructor(parent: HTMLElement) {
        const options: options = {
            tagName: 'ul',
            parent: parent,
            classes: ['option-list'],
        };
        super(options);
    }
}
