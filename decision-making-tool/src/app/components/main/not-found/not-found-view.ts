import { options } from '../../list-option/types';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../view';

export class NotFoundView extends View {
    #default_text = 'Error. Page not found';

    constructor() {
        const options: options = {
            tagName: 'main',
            classes: ['not-found'],
        };
        super(options);
        this.configureView();
    }

    private configureView(): void {
        const text = new ElementCreator({
            tagName: 'h1',
            classes: ['title', 'title-not-found'],
            textContent: this.#default_text,
        });
        this.addInnerElements([text.getElement()]);
    }
}
