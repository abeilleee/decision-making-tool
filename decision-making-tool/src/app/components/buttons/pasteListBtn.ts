import { Button } from './button';
import { ButtonsName } from './types';

export class PasteListButton extends Button {
    constructor() {
        super(ButtonsName.PASTE_LIST, ['paste-list-btn']);
    }
}
