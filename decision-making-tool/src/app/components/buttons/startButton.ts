import { Pages } from '../router/types';
import { Router } from '../router/router';
import { Button } from './button';
import { ButtonsName } from './types';
import { SaveState } from '../save-state/saveState';
import { Modal } from '../modal/modal';

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
        let counter = 0;
        for (let i = 0; i < optionsList.length; i++) {
            if (optionsList[i].title !== '' && Number(optionsList[i].weight) > 0) {
                counter++;
            }
        }
        if (counter < 2) {
            const modal = new Modal();
            modal.addOptionDialog();
            modal.open();
        } else {
            this.router.navigate(Pages.DECISION_PICKER);
        }
    }
}
