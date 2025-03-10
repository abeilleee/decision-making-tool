import { Button } from './button';
import { ButtonsName } from './types';

export class SaveListButton extends Button {
    constructor() {
        super(ButtonsName.SAVE_LIST_TO_FILE, ['save-list-btn']);
    }
}
