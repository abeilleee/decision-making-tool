import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.START, ['start-btn']);
    }
}

export const startBtn = new AddOptionButton().getElement();
