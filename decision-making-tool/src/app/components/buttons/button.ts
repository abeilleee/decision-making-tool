import { text } from 'stream/consumers';
import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { ValidateText } from '../../utils/validateText';

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

    public confirm(textArea: HTMLTextAreaElement): void {
        const validator = new ValidateText();
        const validatedInput = validator.getValidateTextArea(textArea);
        console.log(validatedInput);
    }
}
