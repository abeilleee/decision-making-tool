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

export class DecisionPicker extends View {
    router: Router;
    container: ContainerView;
    btnBox: ContainerView;
    playBtn: PlayButton;
    wheel: WheelCanvas | null;
    constructor(router: Router) {
        const options: options = {
            tagName: 'section',
            classes: ['decision-picker'],
        };
        super(options);
        this.router = router;
        this.container = new ContainerView(['decision-picker__container'], this.element.getElement());
        this.btnBox = new ContainerView(['button-box']);
        this.playBtn = new PlayButton();
        this.wheel = null;
        this.configure();
        this.btnEventListeners();
    }

    private configure(): void {
        const title = new ElementCreator({
            tagName: 'h1',
            classes: ['title'],
            textContent: 'Decision Making Tool',
            parent: this.container.getHTMLElement(),
        });
        const backBtn = new BackButton(this.router);

        const soundBtn = new SoundButton();
        const label = new ElementCreator({ tagName: 'label', classes: ['label', 'timer-label'], textContent: 'Time' });
        const timerInput = new ElementCreator({ tagName: 'input', classes: ['timer-input'] });

        this.container.addInnerElements([this.btnBox.getHTMLElement()]);
        this.btnBox.addInnerElements([
            backBtn.getElement(),
            this.playBtn.getElement(),
            soundBtn.getElement(),
            label.getElement(),
            timerInput.getElement(),
        ]);
        backBtn.getElement().addEventListener('click', () => {
            backBtn.handleClick();
        });
        this.createWheel();
        this.handlerOnload();
    }

    private createWheel(): void {
        const saveState = new SaveState();
        const optionsList = saveState.getFilledOptions();
        this.wheel = new WheelCanvas(optionsList);
        this.container.addInnerElements([this.wheel.getHTMLElement()]);
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

    private btnEventListeners() {
        this.playBtn.getElement().addEventListener('click', () => {
            if (this.wheel) {
                this.playBtn.handleClick(this.wheel);
                this.wheel.wheelState = WheelState.PICKING;
                this.wheel.animate();
            }
        });
    }
}
