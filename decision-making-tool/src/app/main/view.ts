import { ElementCreator } from '../utils/element-creator';
import { options } from '../components/list-option/types';

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

    public addInnerElements(elements: HTMLElement[]): void {
        elements.forEach((child: HTMLElement) => this.element.getElement().append(child));
    }
}
