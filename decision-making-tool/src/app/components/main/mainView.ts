import { options } from '../../types';
import { View } from '../../utils/view';

export class MainView extends View {
    constructor() {
        const options: options = {
            tagName: 'main',
            classes: ['main'],
        };
        super(options);
    }

    setContent(content: View) {
        const htmlElement = this.element.getElement();
        while (htmlElement.firstElementChild) {
            htmlElement.firstElementChild.remove();
        }
    }
}
