import { View } from '../view';

export class TitleView extends View {
    constructor() {
        const options = {
            tagName: 'h1',
            textContent: 'Decision Making Tool',
            classes: ['title'],
        };
        super(options);
    }
}

export const title = new TitleView().getHTMLElement();
