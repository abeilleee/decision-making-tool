import { Button } from './button';
import { ButtonsName } from './enums';

export class ClearListButton extends Button {
    constructor() {
        super(ButtonsName.CLEAR_LIST, ['clear-list-btn']);
    }

    public handleClick(parentElement: HTMLElement): void {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
}
