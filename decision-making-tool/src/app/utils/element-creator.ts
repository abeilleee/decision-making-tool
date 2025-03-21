import { options } from '../components/list-option/types';

export class ElementCreator<T extends HTMLElement = HTMLElement> {
    public element: T | HTMLElement;

    constructor(options: options) {
        this.element = this.createElement(options);
    }

    public getElement(): T | HTMLElement {
        return this.element;
    }

    public createElement(options: options): T | HTMLElement {
        const element = document.createElement(options.tagName);
        this.setClasses(options, element);
        this.setTextContent(options, element);
        this.setParentElement(options, element);
        this.addInnerElement(options, element);
        return element;
    }

    private setClasses(options: options, element: T | HTMLElement): void {
        options.classes.forEach((className: string) => element.classList.add(className));
    }

    private setTextContent(options: options, element: T | HTMLElement): void {
        if (options.textContent) {
            element.textContent = options.textContent;
        }
    }

    private setParentElement(options: options, element: T | HTMLElement): void {
        if (options.parent) {
            options.parent.append(element);
        }
    }

    public addInnerElement(options: options, element: T | HTMLElement): void {
        if (options.children) {
            options.children.forEach((child) => {
                element.append(child);
            });
        }
    }
}
