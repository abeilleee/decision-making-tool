import { options } from '../../types';
import { mainContainer } from '../container/container';
import { View } from '../view';

export class MainView extends View {
    constructor() {
        const options: options = {
            tagName: 'main',
            parent: document.body,
            classes: ['main'],
            children: [mainContainer],
        };

        super(options);
    }
}
