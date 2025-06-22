import { HEX_CODES } from './constants';

export const generateRandomColor = (): string => {
    const hexCodes = HEX_CODES;
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }

    return '#' + color;
};

export const easeInOutBack = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
