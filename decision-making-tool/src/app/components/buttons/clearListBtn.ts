import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.CLEAR_LIST, ['clear-list-btn']);
    }
}

export const clearListBtn = new AddOptionButton().getElement();
