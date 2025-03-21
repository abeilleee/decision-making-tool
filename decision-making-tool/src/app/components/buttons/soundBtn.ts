import { Button } from './button';
import { ButtonsName } from './enums';

export class SoundButton extends Button {
    constructor() {
        super(ButtonsName.SOUND, ['sound-btn']);
    }

    public handleClick(): void {
        this.element.classList.toggle('off');
    }

    public setClass(mute: string) {
        if (mute === 'false') {
            this.element.classList.remove('off');
        } else if (mute === 'true') {
            this.element.classList.add('off');
        }
    }
}
