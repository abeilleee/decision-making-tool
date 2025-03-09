import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.LOAD_LIST_FROM_FILE, ['load-list-btn']);
    }
}

export const loadListFromFileBtn = new AddOptionButton().getElement();
