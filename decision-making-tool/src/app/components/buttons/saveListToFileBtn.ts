import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.SAVE_LIST_TO_FILE);
    }
}

export const saveListToFileBtn = new AddOptionButton().getElement();
