import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';

export class Button extends ElementCreator {
    constructor(text: string, classes?: string[]) {
        const options: options = {
            tagName: 'button',
            classes: classes ? ['button', ...classes] : ['button'],
            textContent: text,
        };
        super(options);
    }
}
