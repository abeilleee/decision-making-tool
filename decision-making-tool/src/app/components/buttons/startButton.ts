import { Pages } from '../router/types';
import { Router } from '../router/router';
import { Button } from './button';
import { ButtonsName } from './types';
import { SaveState } from '../save-state/saveState';
import { Modal } from '../modal/modal';
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
        // let counter = 0;
        // let filledOptions = [];
        // for (let i = 0; i < optionsList.length; i++) {
        //     if (optionsList[i].title !== '' && Number(optionsList[i].weight) > 0) {
        //         counter++;
        //         filledOptions.push(optionsList[i]);
        //     }
        // }
        if (filledOptions.length < 2) {
            const modal = new Modal();
            modal.addOptionDialog();
            modal.open();
        } else {
            this.router.navigate(Pages.DECISION_PICKER);
            const wheel = new WheelCanvas(filledOptions);
            wheel.getHTMLElement();
        }
    }
}
