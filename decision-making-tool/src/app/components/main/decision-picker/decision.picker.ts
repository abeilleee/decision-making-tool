import { options } from '../../list-option/types';
import { View } from '../view';
import { BackButton } from '../../buttons/backBtn';
import { Router } from '../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { ContainerView } from '../../container/container';
import { PlayButton } from '../../buttons/playBtn';
import { SoundButton } from '../../buttons/soundBtn';
import { WheelCanvas } from '../../wheel/wheel1';

export class DecisionPicker extends View {
    router: Router;
    container: ContainerView;
    btnBox: ContainerView;
    wheel: WheelCanvas;

    constructor(router: Router) {
        const options: options = {
            tagName: 'section',
            classes: ['decision-picker'],
        };
        super(options);
        this.router = router;
        this.container = new ContainerView(['decision-picker__container'], this.element.getElement());
        this.btnBox = new ContainerView(['button-box']);
        this.wheel = new WheelCanvas(['new', 'sas', 'new', 'sas', 'new', 'sas']);

        this.configure();
    }

    private configure(): void {
        const title = new ElementCreator({
            tagName: 'h1',
            classes: ['title'],
            textContent: 'Decision Making Tool',
            parent: this.container.getHTMLElement(),
        });
        const backBtn = new BackButton(this.router);
        const playBtn = new PlayButton();
        const soundBtn = new SoundButton();
        const label = new ElementCreator({ tagName: 'label', classes: ['label', 'timer-label'], textContent: 'Time' });
        const timerInput = new ElementCreator({ tagName: 'input', classes: ['timer-input'] });

        this.container.addInnerElements([this.btnBox.getHTMLElement(), this.wheel.getHTMLElement()]);
        this.btnBox.addInnerElements([
            backBtn.getElement(),
            playBtn.getElement(),
            soundBtn.getElement(),
            label.getElement(),
            timerInput.getElement(),
        ]);
        backBtn.getElement().addEventListener('click', () => {
            backBtn.handleClick();
        });
    }
}
