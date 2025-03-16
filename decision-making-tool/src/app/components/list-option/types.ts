export type options = {
    tagName: string;
    parent?: HTMLElement;
    children?: HTMLElement[];
    textContent?: string;
    classes: string[];
    callback?: void;
};

export type savedOption = {
    id: number;
    title: string;
    weight: string;
};
