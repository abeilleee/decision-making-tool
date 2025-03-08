import { options } from '../../types';
import { container } from '../container/container';
import { View } from '../view';

export class HeaderView extends View {
    constructor() {
        const options: options = {
            tagName: 'header',
            parent: [document.body],
            children: [container],
            textContent: 'header',
            classes: ['header'],
        };
        super(options);
    }
}
