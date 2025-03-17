export type OptionsParams = {
    id: number;
    title: string;
    weight: string;
};

export type optionNameParams = {
    startAngle: number;
    sliceAngle: number;
    options: OptionsParams;
    centerX: number;
    centerY: number;
};

export type centerElement = {
    x: number;
    y: number;
    radius: number;
};

export enum WheelState {
    INITIAL = 'initial',
    PICKING = 'picking',
    PICKED = 'picked',
}
