import { Button } from './button';
import { ButtonsName } from './types';

export class DeleteButton extends Button {
    constructor() {
        super(ButtonsName.DELETE, ['delete-btn']);
    }

    public handleClick(event: Event) {
        let target = event.target;
        if (target instanceof HTMLElement) {
            const parentElement = target.parentElement;
            parentElement?.remove();
        }
    }
}
