import { WheelCanvas } from '../wheel/wheel';
import { Button } from './button';
import { ButtonsName } from './types';

export class PlayButton extends Button {
    constructor() {
        super(ButtonsName.START, ['play-btn']);
    }

    public handleClick(wheel: WheelCanvas): void {}
}
