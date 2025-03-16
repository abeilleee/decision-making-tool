import { Pages } from '../router/pages';
import { Router } from '../router/router';
import { Button } from './button';
import { ButtonsName } from './types';

export class StartButton extends Button {
    router: Router;
    constructor(router: Router) {
        super(ButtonsName.START, ['start-btn']);
        this.router = router;
    }

    public handleClick() {
        this.router.navigate(Pages.NOT_FOUND);
    }
}
