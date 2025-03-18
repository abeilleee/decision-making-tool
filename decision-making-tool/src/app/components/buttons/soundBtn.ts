import { Button } from './button';
import { ButtonsName } from './types';

export class SoundButton extends Button {
    constructor() {
        super(ButtonsName.SOUND, ['sound-btn']);
    }

    public handleClick(): void {
        this.element.classList.toggle('off');
    }
}
