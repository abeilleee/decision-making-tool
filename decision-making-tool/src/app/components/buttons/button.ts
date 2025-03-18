import { options } from '../list-option/types';
import { ElementCreator } from '../../utils/element-creator';

export class Button extends ElementCreator<HTMLButtonElement> {
    constructor(text: string, classes?: string[], parent?: HTMLElement) {
        const options: options = {
            tagName: 'button',
            classes: classes ? ['button', ...classes] : ['button'],
            textContent: text,
            parent: parent,
        };
        super(options);
    }

    public disableBtn(btn: HTMLElement): void {
        btn.classList.add('disabled');
    }
}
