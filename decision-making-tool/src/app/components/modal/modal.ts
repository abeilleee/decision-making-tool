import { ElementCreator } from '../../utils/element-creator';
import { Button } from '../buttons/button';
import { ButtonsName } from '../buttons/types';

export class Modal {
    modal: HTMLDialogElement | HTMLElement;
    form: HTMLFormElement | HTMLElement;
    cancelButton: HTMLButtonElement | HTMLElement;
    confirmButton: HTMLButtonElement | HTMLElement;
    textArea: HTMLTextAreaElement | HTMLElement;

    constructor() {
        this.modal = new ElementCreator<HTMLDialogElement>({ tagName: 'dialog', classes: ['modal'] }).getElement();
        this.form = new ElementCreator<HTMLFormElement>({ tagName: 'form', classes: ['form'] }).getElement();
        this.textArea = new ElementCreator<HTMLTextAreaElement>({
            tagName: 'textarea',
            classes: ['textarea'],
        }).getElement();
        this.cancelButton = new Button(ButtonsName.CANCEL, ['cancel-btn', 'button'], this.form).getElement();
        this.confirmButton = new Button(ButtonsName.CONFIRM, ['confirm-btn', 'button'], this.form).getElement();

        this.configureModal();
        this.addEventListeners();
    }

    private configureModal(): void {
        document.body.appendChild(this.modal);
        this.modal.append(this.form);
        this.form.append(this.textArea);

        if (this.textArea instanceof HTMLTextAreaElement) {
            this.textArea.placeholder = `Paste a list of new options in a CSV-like format:

title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with &quot;quotes&quot;,4   -> | title with &quot;quotes&quot;   | 4 |`;
        }
    }

    private addEventListeners(): void {
        this.cancelButton.addEventListener('click', () => this.close());
        this.confirmButton.addEventListener('click', () => this.handleConfirm());

        this.modal.addEventListener('click', (event) => {
            if (event.target !== this.form && event.target !== this.textArea) {
                this.close();
            }
        });
        window.addEventListener('scroll', this.preventScroll);
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

    private close(): void {
        if (this.modal instanceof HTMLDialogElement) {
            this.modal.close();
        }
        document.body.style.overflow = '';
        this.modal.remove();
    }

    private handleConfirm(): void {
        let lines;

        if (this.textArea instanceof HTMLTextAreaElement) {
            lines = this.textArea.value.split('\n');
        }
        if (lines) {
            lines.forEach((line) => {
                const option = document.createElement('option');
                option.textContent = line;
            });
        }

        this.close();
    }

    private preventScroll(event: Event): void {
        event.preventDefault();
    }
}
