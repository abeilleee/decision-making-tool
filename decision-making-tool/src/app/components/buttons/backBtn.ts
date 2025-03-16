import { Option } from '../list-option/option';
import { Router } from '../router/router';
import { Pages } from '../router/types';
import { Button } from './button';
import { ButtonsName } from './types';

export class BackButton extends Button {
    router: Router;
    constructor(router: Router) {
        super(ButtonsName.BACK, ['button']);
        this.router = router;
    }

    public handleClick() {
        this.router.navigate(Pages.INDEX);
    }
}
