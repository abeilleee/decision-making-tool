import { Router } from '../../services/router/router';
import { Pages } from '../../services/router/types';
import { Button } from './button';
import { ButtonsName } from './enums';

export class BackButton extends Button {
    private router: Router;

    constructor(router: Router) {
        super(ButtonsName.BACK, ['button', 'back-btn']);
        this.router = router;
    }

    public handleClick(): void {
        this.router.navigate(Pages.INDEX);
    }
}
