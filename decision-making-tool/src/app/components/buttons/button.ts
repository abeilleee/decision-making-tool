import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';

export class Button extends ElementCreator {
    constructor(text: string, callback: void) {
        const options: options = {
            tagName: 'button',
            classes: ['button'],
            textContent: text,
            callback: callback,
        };
        super(options);
    }
}
