import { ElementCreator } from '../../utils/element-creator';
import { parsedData, ValidateText } from '../../utils/validateText';
import { Button } from '../buttons/button';
import { ButtonsName } from '../buttons/types';

export const enum TextModal {
    PLAY_BTN_MESSAGE = 'The duration must be from 5 to 30 seconds!',
    START_BTN_MESSAGE = 'Please add at last 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0',
}

export class Modal {
    modal: HTMLDialogElement | HTMLElement;
    form: HTMLFormElement | HTMLElement;
    cancelButton: Button;
    confirmButton: Button;
    textArea: HTMLTextAreaElement | HTMLElement;

    constructor() {
        this.modal = new ElementCreator<HTMLDialogElement>({ tagName: 'dialog', classes: ['modal'] }).getElement();
        this.form = new ElementCreator<HTMLFormElement>({ tagName: 'form', classes: ['form'] }).getElement();
        this.textArea = new ElementCreator<HTMLTextAreaElement>({
            tagName: 'textarea',
            classes: ['textarea'],
        }).getElement();
        this.cancelButton = new Button(ButtonsName.CANCEL, ['cancel-btn', 'button'], this.form);
        this.confirmButton = new Button(ButtonsName.CONFIRM, ['confirm-btn', 'button'], this.form);
        this.configureModal();
        this.addEventListeners();
    }

    private configureModal(): void {
        document.body.appendChild(this.modal);
        this.modal.append(this.form);
        this.form.append(this.textArea);

        if (this.textArea instanceof HTMLTextAreaElement) {
            this.textArea.placeholder = `Paste a list of new options in a CSV-like format:
            
title, weight`;
        }
    }

    private addEventListeners(): void {
        this.cancelButton.getElement().addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (event) => {
            if (
                event.target !== this.form &&
                event.target !== this.textArea &&
                event.target !== this.confirmButton.getElement() &&
                event.target !== this.cancelButton.getElement()
            ) {
                this.close();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        });
        window.addEventListener('scroll', this.preventScroll);
        this.form.addEventListener('click', (MouseEvent: Event) => {
            MouseEvent?.preventDefault();
        });
    }

    public open(): void {
        if (this.modal instanceof HTMLDialogElement) {
            this.modal.showModal();
        }
        if (this.textArea instanceof HTMLTextAreaElement) {
            this.textArea.value = '';
        }
        document.body.style.overflow = 'hidden';
    }

    public close(): void {
        if (this.modal instanceof HTMLDialogElement) {
            this.modal.close();
        }
        document.body.style.overflow = '';
        this.modal.remove();
    }

    private preventScroll(event: Event): void {
        event.preventDefault();
    }

    public getParsedData(): parsedData | void {
        const validator = new ValidateText();
        if (this.textArea instanceof HTMLTextAreaElement) {
            return validator.getValidateTextArea(this.textArea);
        }
    }

    public addOptionDialog(text: TextModal): void {
        if (this.form.firstChild) {
            while (this.form.childNodes.length !== 1) {
                this.form.removeChild(this.form.firstChild);
            }
        }
        if (this.textArea instanceof HTMLTextAreaElement) {
            this.textArea.disabled = true;
            this.textArea.placeholder = text;
        }
        const closeBtn = new Button('Close');
        this.form.append(closeBtn.getElement());
    }
}
