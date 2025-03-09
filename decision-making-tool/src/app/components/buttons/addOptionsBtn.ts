import { Button } from './button';
import { ButtonsName } from './types';

export class AddOptionButton extends Button {
    constructor() {
        super(ButtonsName.ADD_OPTION);
    }
}

export const addOptionBtn = new AddOptionButton().getElement();
