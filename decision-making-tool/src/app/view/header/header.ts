import { options } from '../../types';
import { ContainerView } from '../container/container';
import { View } from '../view';
import { title } from './title';

const headerContainer = new ContainerView(['header__container']).getHTMLElement();

export class HeaderView extends View {
    constructor() {
        const options: options = {
            tagName: 'header',
            parent: document.body,
            children: [headerContainer],
            classes: ['header'],
        };
        super(options);
        this.setTitle(title);
    }

    private setTitle(title: HTMLElement): void {
        headerContainer.appendChild(title);
    }
}
