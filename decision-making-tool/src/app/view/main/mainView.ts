import { options } from '../../types';
import { container } from '../container/container';
import { View } from '../view';

export class MainView extends View {
    constructor() {
        const options: options = {
            tagName: 'main',
            parent: [document.body],
            children: [container],
            textContent: 'Hello',
            classes: ['main'],
        };

        super(options);
    }
}
