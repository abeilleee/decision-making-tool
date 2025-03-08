import { options } from '../../types';
import { container } from '../container/container';
import { View } from '../view';
import { title } from './title';

export class HeaderView extends View {
    constructor() {
        const options: options = {
            tagName: 'header',
            parent: document.body,
            children: [container],
            classes: ['header'],
        };
        super(options);
        this.setTitle(title);
    }

    private setTitle(title: HTMLElement): void {
        container.appendChild(title);
    }
}
