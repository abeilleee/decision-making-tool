import { ElementCreator } from './utils/element-creator';
import { View } from './view/view';

export type options = {
    tagName: string;
    parent?: HTMLElement[];
    children?: HTMLElement[];
    textContent?: string;
    classes: string[];
    callback?: void;
};
