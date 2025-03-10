import { Button } from './button';
import { ButtonsName } from './types';

export class StartButton extends Button {
    constructor() {
        super(ButtonsName.START, ['start-btn']);
    }
}
