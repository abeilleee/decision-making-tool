import { Button } from './button';
import { ButtonsName } from './enums';

export class PasteListButton extends Button {
    constructor() {
        super(ButtonsName.PASTE_LIST, ['paste-list-btn']);
    }
}
