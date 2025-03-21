import { ElementCreator } from '../../utils/element-creator';
import { parsedData, ValidateText } from '../../services/validateText';
import { Button } from '../buttons/button';
import { ButtonsName } from '../buttons/enums';
import { placeholderText } from './constants';
import { TextModal } from './constants';

export class Modal {
    modal: HTMLDialogElement | HTMLElement;
    form: HTMLFormElement | HTMLElement;
    cancelButton: Button;
    confirmButton: Button;
    textArea: HTMLTextAreaElement | HTMLElement;

    constructor() {
        this.modal = new ElementCreator({ tagName: 'dialog', classes: ['modal'] }).getElement();
        this.form = new ElementCreator({ tagName: 'form', classes: ['form'] }).getElement();
        this.textArea = new ElementCreator({
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
            this.textArea.placeholder = placeholderText;
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
