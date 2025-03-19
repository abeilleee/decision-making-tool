import { options } from '../../list-option/types';
import { View } from '../view';
import { BackButton } from '../../buttons/backBtn';
import { Router } from '../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { ContainerView } from '../../container/container';
import { PlayButton } from '../../buttons/playBtn';
import { SoundButton } from '../../buttons/soundBtn';
import { WheelCanvas } from '../../wheel/wheel';
import { SaveState } from '../../save-state/saveState';
import { WheelState } from '../../wheel/types';
import { Modal, TextModal } from '../../modal/modal';

export class DecisionPicker extends View {
    router: Router;
    container: ContainerView;
    btnBox: ContainerView;
    soundBtn: SoundButton;
    backBtn: BackButton;
    playBtn: PlayButton;
    wheel: WheelCanvas | null;
    wheelState: WheelState;
    timerLabel: ElementCreator | null;
    timerInput: HTMLInputElement | null;
    message: HTMLInputElement | null;
    timerInputValue: number = 5;

    constructor(router: Router) {
        const options: options = {
            tagName: 'section',
            classes: ['decision-picker'],
        };
        super(options);
        this.router = router;
        this.container = new ContainerView(['decision-picker__container'], this.element.getElement());
        this.btnBox = new ContainerView(['button-box']);
        this.backBtn = new BackButton(this.router);
        this.playBtn = new PlayButton();
        this.soundBtn = new SoundButton();
        this.wheel = null;
        this.message = null;
        this.timerInput = null;
        this.timerLabel = null;
        this.wheelState = WheelState.INITIAL;
        this.configure();
        this.EventListeners();
    }

    private configure(): void {
        const title = new ElementCreator({
            tagName: 'h1',
            classes: ['title'],
            textContent: 'Decision Making Tool',
            parent: this.container.getHTMLElement(),
        });

        this.timerLabel = new ElementCreator({
            tagName: 'label',
            classes: ['label', 'timer-label'],
            textContent: 'Time',
        });
        this.timerInput = document.createElement('input');
        this.timerInput.classList.add('timer-input');
        this.timerInput.type = 'number';
        this.timerInput.value = '5';

        this.message = document.createElement('input');
        this.message.classList.add('message');
        this.message.disabled = true;
        this.message.value = "Let's get started! Click start!";

        this.container.addInnerElements([this.btnBox.getHTMLElement(), this.message]);
        this.btnBox.addInnerElements([
            this.backBtn.getElement(),
            this.playBtn.getElement(),
            this.soundBtn.getElement(),
            this.timerLabel.getElement(),
            this.timerInput,
        ]);
        this.backBtn.getElement().addEventListener('click', () => {
            this.backBtn.handleClick();
        });
        this.createWheel();
        this.handlerOnload();
    }

    private createWheel(): void {
        const saveState = new SaveState();
        const optionsList = saveState.getFilledOptions();
        if (this.timerInput && this.message) {
            this.wheel = new WheelCanvas(optionsList, this.timerInput, this.btnBox, this.message);
            this.container.addInnerElements([this.wheel.getHTMLElement()]);
        }
    }

    private handlerOnload(): void {
        window.onload = () => {
            const children = this.container.getHTMLElement().children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'CANVAS') {
                    this.container.getHTMLElement().removeChild(child);
                }
            }
            this.createWheel();
        };
    }

    private EventListeners() {
        this.playBtn.getElement().addEventListener('click', () => {
            const modal = new Modal();
            if (this.timerInput) {
                const timerValue = this.timerInputValue;
                if (timerValue < 5 || timerValue > 30) {
                    modal.open();
                    modal.addOptionDialog(TextModal.PLAY_BTN_MESSAGE);
                } else {
                    if (this.wheel) {
                        this.wheel.rotate();
                    }
                }
                // this.doDisableBtn();
            }
        });

        this.soundBtn.getElement().addEventListener('click', () => {
            this.soundBtn.handleClick();
        });
        if (this.timerInput) {
            this.timerInput.addEventListener('input', () => {
                this.timerInputValue = this.timerInput ? +this.timerInput.value : 5;
            });
        }
    }

    // private doDisableBtn() {
    //     if (this.wheelState === WheelState.PICKING) {
    //         const elements = [
    //             this.playBtn.getElement(),
    //             // this.backBtn.getElement(),
    //             this.timerInput,
    //             this.timerLabel?.getElement(),
    //             this.soundBtn.getElement(),
    //         ];
    //         elements.forEach((elem) => (elem ? elem.classList.add('disabled') : ''));
    //     } else {
    //         const elements = [
    //             this.playBtn.getElement(),
    //             // this.backBtn.getElement(),
    //             this.timerInput,
    //             this.timerLabel?.getElement(),
    //             this.soundBtn.getElement(),
    //         ];
    //         elements.forEach((elem) => (elem ? elem.classList.remove('disabled') : ''));
    //     }
    // }
}
console.log('Проверьте пожалуйста попозже!!!!!!!!');
