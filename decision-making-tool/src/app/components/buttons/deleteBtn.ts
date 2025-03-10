import { Button } from './button';
import { ButtonsName } from './types';

export class DeleteButton extends Button {
    constructor() {
        super(ButtonsName.DELETE, ['delete-btn']);
    }

    public handleClick(parentContainer: HTMLElement) {
        const lastChild = parentContainer.lastChild;
        if (lastChild && lastChild instanceof HTMLElement) {
            parentContainer.removeChild(lastChild);
        }
    }
}
