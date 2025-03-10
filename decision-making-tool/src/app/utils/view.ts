import { ElementCreator } from './element-creator';
import { options } from '../types';

export class View {
    element: ElementCreator;

    constructor(options: options) {
        this.element = this.createView(options);
    }

    public getHTMLElement(): HTMLElement {
        return this.element.getElement();
    }

    private createView(options: options): ElementCreator {
        const element = new ElementCreator(options);
        return element;
    }

    public addInnerElements(elements: HTMLElement[]) {
        elements.forEach((child: HTMLElement) => this.element.getElement().append(child));
    }
}
