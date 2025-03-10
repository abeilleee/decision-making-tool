import { Button } from './button';
import { ButtonsName } from './types';

export class DeleteButton extends Button {
    constructor() {
        super(ButtonsName.DELETE, ['delete-btn']);
    }
}
