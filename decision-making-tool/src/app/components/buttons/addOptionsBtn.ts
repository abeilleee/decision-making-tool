import { Option } from '../list-option/option';
import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.ADD_OPTION, ['add-option-btn']);
    }

    public handleClick(prevValue: number, currentId: number, optionContainer: HTMLElement): void {
        Option.currentId = prevValue;
        new Option(optionContainer);
    }
}
