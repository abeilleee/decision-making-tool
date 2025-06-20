import { options } from '../components/list-option/types';
import { View } from './view';

export class MainView extends View {
    constructor() {
        const options: options = {
            tagName: 'main',
            classes: ['main'],
        };
        super(options);
    }

    public setContent(): void {
        const htmlElement = this.element.getElement();
        while (htmlElement.firstElementChild) {
            htmlElement.firstElementChild.remove();
        }
    }
}
