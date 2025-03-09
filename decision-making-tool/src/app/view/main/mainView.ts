import { options } from '../../types';
import { ContainerView } from '../container/container';
import { View } from '../view';

export const mainContainer = new ContainerView(['main__container']).getHTMLElement();

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
