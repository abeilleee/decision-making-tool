import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.ADD_OPTION, ['add-option-btn']);
    }

    public handleClick(parentContainer: HTMLElement, child: HTMLElement): void {
        parentContainer.append(child);
    }
}
