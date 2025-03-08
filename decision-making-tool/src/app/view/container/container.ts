import { options } from '../../types';
import { View } from '../view';

export class ContainerView extends View {
    constructor() {
        const options: options = {
            tagName: 'div',
            classes: ['container'],
        };

        super(options);
    }
}

export const container = new ContainerView().getHTMLElement();
