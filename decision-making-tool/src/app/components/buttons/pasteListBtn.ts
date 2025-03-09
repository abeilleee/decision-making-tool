import { Button } from './button';
import { ButtonsName } from './types';

export class PasteListButton extends Button {
    constructor() {
        super(ButtonsName.PASTE_LIST, ['paste-list-btn']);
    }
}

export const pasteListBtn = new PasteListButton().getElement();
