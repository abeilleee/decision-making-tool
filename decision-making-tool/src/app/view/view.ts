import { ElementCreator } from '../utils/element-creator';
import { options } from '../types';

export class View {
    element: ElementCreator;
    constructor(options: options) {
        this.element = this.createView(options);
    }

    getHTMLElement() {
        return this.element.getElement();
    }

    createView(options: options): ElementCreator {
        const element = new ElementCreator(options);
        return element;
    }
}
