import { options } from '../../types';
import { ElementCreator } from '../../utils/element-creator';
import { mainContainer } from '../../view/container/container';

export class ButtonContainer extends ElementCreator {
    constructor(children: HTMLElement[]) {
        const options: options = {
            tagName: 'div',
            parent: mainContainer,
            classes: ['button__container'],
            children: children,
        };

        super(options);
    }
}
