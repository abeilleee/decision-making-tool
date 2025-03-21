export const MS_PER_SEC = 1000;
export const TWO_PI = 2 * Math.PI;
export const POINTER_COORDINATES = (3 * Math.PI) / 2;
export const HEX_CODES = '0123456789ABCDEF';
export const CANVAS_WIDTH = 420;
export const CANVAS_HEIGHT = 440;
export const START_RANDOM_ANGLE = Math.floor(Math.random() * (10 - 1)) + 10;

export enum NUMBERS {
    ZERO = 0,
    ONE = 1,
    HALF = 2,
    DOUBLE = 2,
}

export enum ANIMATION_PARAMS {
    FULL_ROTATIONS = 5,
    DEFAULT_DURATION = 5,
}

export enum TEXT_PARAMS {
    MAX_LENGTH = 12,
    FONT_SIZE = 14,
    SHADOW_BLUR = 15,
    SHADOW_OFFSET_X = 0,
    SHADOW_OFFSET_Y = 0,
    SHADOW_COLOR = 'black',
    FILL_COLOR = 'white',
}

export enum CURSOR_SETTINGS {
    SIZE = 17,
    COLOR = 'rgba(68, 0, 255, 0.8)',
    BORDER_COLOR = 'black',
}

export enum CENTER_ELEMENT_SETTINGS {
    BORDER_SIZE = 2,
    BORDER_COLOR = 'white',
}
