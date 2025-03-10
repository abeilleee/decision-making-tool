import { options } from '../../types';
import { View } from '../../view/view';

export class OptionList extends View {
    constructor(parent: HTMLElement) {
        const options: options = {
            tagName: 'ul',
            parent: parent,
            classes: ['option-list'],
        };
        super(options);
    }
}
