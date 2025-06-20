import { options } from '../../components/list-option/types';
import { View } from '../view';

export class ContainerView extends View {
    constructor(className: string[], parent?: HTMLElement) {
        const options: options = {
            tagName: 'div',
            classes: ['container', ...className],
            parent: parent,
        };

        super(options);
    }

    public toggleDisable(action: string): void {
        const children = Array.from(this.element.getElement().children);

        children.forEach((elem) =>
            elem instanceof HTMLElement
                ? action === 'add'
                    ? elem.classList.add('disabled')
                    : elem.classList.remove('disabled')
                : console.error('Element is not HTMLElement')
        );
    }
}
