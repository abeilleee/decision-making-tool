import { Button } from './button';
import { ButtonsName } from './types';

export class ClearListButton extends Button {
    constructor() {
        super(ButtonsName.CLEAR_LIST, ['clear-list-btn']);
    }
}
