import { Button } from './button';
import { ButtonsName } from './types';

export class PasteListButton extends Button {
    constructor() {
        super(ButtonsName.PASTE_LIST);
    }
}

export const pasteListBtn = new PasteListButton().getElement();
