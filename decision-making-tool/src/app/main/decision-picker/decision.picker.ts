import { options } from '../../components/list-option/types';
import { View } from '../view';
import { BackButton } from '../../components/buttons/backBtn';
import { Router } from '../../services/router/router';
import { ElementCreator } from '../../utils/element-creator';
import { ContainerView } from '../container/container';
import { PlayButton } from '../../components/buttons/playBtn';
import { SoundButton } from '../../components/buttons/soundBtn';
import { WheelCanvas } from '../../components/wheel/wheel';
import { SaveState } from '../../services/saveState';
import { WheelState } from '../../components/wheel/types';
import { Modal } from '../../components/modal/modal';
import { TextModal } from '../../components/modal/constants';
import { SoundHandler } from '../../services/soundHandler';

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
    timerInput: HTMLInputElement | HTMLElement | null;
    message: HTMLInputElement | HTMLElement | null;
    soundHandler: SoundHandler;
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
        this.soundHandler = new SoundHandler();
        this.configure();
        this.addEventListeners();
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

        this.timerInput = new ElementCreator({
            tagName: 'input',
            classes: ['timer-input'],
        }).getElement();
        if (this.timerInput instanceof HTMLInputElement) {
            this.timerInput.value = '5';
        }

        this.message = new ElementCreator({
            tagName: 'input',
            classes: ['message'],
        }).getElement();
        if (this.message instanceof HTMLInputElement) {
            this.message.disabled = true;
            this.message.value = "Let's get started! Click start!";
        }

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
        const soundOption = this.soundHandler.getData();

        if (soundOption) this.soundBtn.setClass(soundOption);
        this.createWheel();
        this.handlerOnload();
        this.soundHandler.setSoundHandler();
    }

    private createWheel(): void {
        const saveState = new SaveState();
        const optionsList = saveState.getFilledOptions();
        if (this.timerInput instanceof HTMLInputElement && this.message instanceof HTMLInputElement) {
            this.wheel = new WheelCanvas(optionsList, this.timerInput, this.btnBox, this.message, this.soundHandler);
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

    private addEventListeners(): void {
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
            }
        });

        this.soundBtn.getElement().addEventListener('click', () => {
            this.soundBtn.handleClick();
            this.soundHandler.setSoundOption();
        });
        if (this.timerInput) {
            this.timerInput.addEventListener('input', () => {
                if (this.timerInput instanceof HTMLInputElement)
                    this.timerInputValue = this.timerInput ? +this.timerInput.value : 5;
            });
        }
    }
}
