import { text } from 'stream/consumers';
import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { parsedData, ValidateText } from '../../utils/validateText';

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

    public confirm(textArea: HTMLTextAreaElement, callback: void): void | parsedData {
        // const validator = new ValidateText();
        // const validatedInput = validator.getValidateTextArea(textArea);
        // if (validatedInput) {
        //     return validatedInput;
        // }
    }
}
