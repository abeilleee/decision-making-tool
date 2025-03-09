import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';

export class Option {
    option: HTMLElement;

    constructor() {
        const options: options = {
            tagName: 'li',
            classes: ['option'],
        };
        this.option = new ElementCreator(options).getElement();
    }
}
