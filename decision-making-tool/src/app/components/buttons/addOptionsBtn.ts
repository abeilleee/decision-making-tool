import { Option } from '../list-option/option';

import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.ADD_OPTION, ['add-option-btn']);
        this.handleClick();
    }

    public handleClick() {
        const element = this.getElement();
        element.addEventListener('click', () => {});
    }
}
