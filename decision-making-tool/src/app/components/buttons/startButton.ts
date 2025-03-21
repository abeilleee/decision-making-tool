import { Pages } from '../../services/router/types';
import { Router } from '../../services/router/router';
import { Button } from './button';
import { ButtonsName } from './types';
import { SaveState } from '../../services/saveState';
import { Modal, TextModal } from '../modal/modal';
import { WheelCanvas } from '../wheel/wheel';

export class StartButton extends Button {
    router: Router;
    saveState: SaveState;

    constructor(router: Router, saveState: SaveState) {
        super(ButtonsName.START, ['start-btn']);
        this.router = router;
        this.saveState = saveState;
    }

    public handleClick(): void {
        const optionsList = this.saveState.getData().list;
        const filledOptions = this.saveState.getFilledOptions();
        if (filledOptions.length < 2) {
            const modal = new Modal();
            modal.addOptionDialog(TextModal.START_BTN_MESSAGE);
            modal.open();
        } else {
            this.router.navigate(Pages.DECISION_PICKER);
            const wheel = new WheelCanvas(filledOptions);
            wheel.getHTMLElement();
        }
    }
}
