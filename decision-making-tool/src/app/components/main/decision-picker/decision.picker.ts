import { options } from '../../list-option/types';
import { View } from '../view';
import { BackButton } from '../../buttons/backBtn';
import { Router } from '../../router/router';

export class DecisionPicker extends View {
    backBtn: BackButton;
    router: Router;

    constructor(router: Router) {
        const options: options = {
            tagName: 'section',
            classes: ['decision-picker'],
            textContent: 'Wheel',
        };
        super(options);
        this.router = router;
        this.backBtn = new BackButton(this.router);
        this.configure();
    }

    public configure(): void {
        this.element.addChildren([this.backBtn.getElement()]);
        this.backBtn.getElement().addEventListener('click', () => {
            this.backBtn.handleClick();
        });
    }
}
