import { Router } from '../router/router';
import { Pages } from '../router/types';
import { Button } from './button';
import { ButtonsName } from './types';

export class BackButton extends Button {
    router: Router;
    constructor(router: Router) {
        super(ButtonsName.BACK, ['button', 'back-btn']);
        this.router = router;
    }

    public handleClick(): void {
        this.router.navigate(Pages.INDEX);
    }
}
