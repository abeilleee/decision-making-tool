import { options } from '../../types';
import { container, ContainerView } from '../container/container';
import { View } from '../view';

export class MainView extends View {
    constructor() {
        const container = new ContainerView().getHTMLElement();

        const options: options = {
            tagName: 'main',
            parent: document.body,
            children: [container],
            classes: ['main'],
        };

        super(options);
    }
}
