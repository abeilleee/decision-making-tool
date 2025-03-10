import { mainContainer } from '../container/container';
import { View } from '../view';

export class TitleView extends View {
    constructor() {
        const options = {
            tagName: 'h1',
            textContent: 'Decision Making Tool',
            classes: ['main__title'],
            parent: mainContainer,
        };
        super(options);
    }
}
