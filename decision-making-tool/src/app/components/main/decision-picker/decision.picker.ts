import { options } from '../../../types';
import { View } from '../../../utils/view';

export class DecisionPicker extends View {
    constructor() {
        const options: options = {
            tagName: 'section',
            classes: ['decision-picker'],
        };
        super(options);
    }
}
