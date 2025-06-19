import { ElementCreator } from '../utils/element-creator';
import { options } from '../components/list-option/types';

export class View {
    public element: ElementCreator;

    constructor(options: options) {
        this.element = this.createView(options);
    }

    public getHTMLElement(): HTMLElement {
        return this.element.getElement();
    }

    public addInnerElements(elements: HTMLElement[]): void {
        elements.forEach((child: HTMLElement) => this.element.getElement().append(child));
    }

    private createView(options: options): ElementCreator {
        const element = new ElementCreator(options);
        return element;
    }
}
