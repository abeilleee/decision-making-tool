import { Option } from '../list-option/option';
import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.ADD_OPTION, ['add-option-btn']);
    }

    public handleClick(optionContainer: HTMLElement, lastId: number): Option {
        const newOption = new Option(optionContainer, Number(lastId));
        return newOption;
    }
}
