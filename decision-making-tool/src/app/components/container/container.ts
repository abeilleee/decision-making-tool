import { options } from '../../types';
import { View } from '../../utils/view';

export class ContainerView extends View {
    constructor(className: string[], parent?: HTMLElement) {
        const options: options = {
            tagName: 'div',
            classes: ['container', ...className],
            parent: parent,
        };

        super(options);
    }
}
