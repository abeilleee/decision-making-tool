import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.SAVE_LIST_TO_FILE, ['save-list-btn']);
    }
}

export const saveListToFileBtn = new AddOptionButton().getElement();
