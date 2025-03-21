import { Button } from './button';
import { ButtonsName } from './enums';

export class PlayButton extends Button {
    constructor() {
        super(ButtonsName.START, ['play-btn']);
    }
}
