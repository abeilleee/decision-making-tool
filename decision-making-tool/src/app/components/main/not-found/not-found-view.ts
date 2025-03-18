import { options } from '../../list-option/types';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../view';
import { BackButton } from '../../buttons/backBtn';
import { Router } from '../../router/router';

export class NotFoundView extends View {
    #default_text = 'Error. Page not found';
    router: Router;
    backBtn: BackButton;

    constructor(router: Router) {
        const options: options = {
            tagName: 'main',
            classes: ['not-found'],
        };
        super(options);
        this.router = router;
        this.backBtn = new BackButton(this.router);
        this.configureView();
    }

    private configureView(): void {
        const text = new ElementCreator({
            tagName: 'h1',
            classes: ['title', 'title-not-found'],
            textContent: this.#default_text,
        });
        this.addInnerElements([text.getElement(), this.backBtn.getElement()]);
        this.backBtn.getElement().style.margin = '0 auto';
        this.backBtn.getElement().addEventListener('click', () => {
            this.backBtn.handleClick();
        });
    }
}
