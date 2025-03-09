import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.CLEAR_LIST);
    }
}

export const clearListBtn = new AddOptionButton().getElement();
