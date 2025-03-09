import { options } from '../types';

export class ElementCreator {
    private element: HTMLElement;

    constructor(options: options) {
        this.element = this.createElement(options);
    }

    getElement(): HTMLElement {
        return this.element;
    }

    createElement(options: options): HTMLElement {
        const element = document.createElement(options.tagName);
        this.setClasses(options, element);
        this.setTextContent(options, element);
        this.setCallback(options, element);
        this.setParentElement(options, element);
        this.addInnerElement(options, element);
        return element;
    }

    private setClasses(options: options, element: HTMLElement): void {
        options.classes.forEach((className: string) => element.classList.add(className));
    }

    setTextContent(options: options, element: HTMLElement): void {
        if (options.textContent) {
            element.textContent = options.textContent;
        }
    }

    private setCallback(options: options, element: HTMLElement): void {
        if (typeof options.callback === 'function') {
            element.addEventListener('click', (event) => options.callback);
        }
    }

    private setParentElement(options: options, element: HTMLElement) {
        if (options.parent) {
            options.parent.append(element);
        }
    }

    private addInnerElement(options: options, element: HTMLElement) {
        if (options.children) {
            options.children.forEach((child) => {
                element.append(child);
            });
        }
    }
}
