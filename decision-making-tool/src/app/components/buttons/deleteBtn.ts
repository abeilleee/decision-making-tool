import { SaveState } from '../../services/saveState';
import { Button } from './button';
import { ButtonsName } from './enums';

export class DeleteButton extends Button {
    constructor() {
        super(ButtonsName.DELETE, ['delete-btn']);
    }

    public handleClick(event: Event): void {
        const target = event.target;
        if (target instanceof HTMLElement) {
            const parentElement = target.parentElement;
            parentElement?.remove();
        }
        const saveState = new SaveState();
        if (target instanceof HTMLElement) {
            if (target.parentElement instanceof HTMLLIElement) {
                saveState.removeFromLocalStorage(target.parentElement);
            } else {
                console.error('Error while deleting an element');
            }
        }
    }
}
