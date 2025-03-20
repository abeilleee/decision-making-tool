import { ElementCreator } from '../../utils/element-creator';
import { SoundHandler } from '../../utils/soundHandler';
import { ContainerView } from '../container/container';
import { WheelState } from './types';
import {
    ANIMATION_PARAMS,
    CENTER_ELEMENT_SETTINGS,
    CURSOR_SETTINGS,
    HEX_CODES,
    MS_PER_SEC,
    NUMBERS,
    POINTER_COORDINATES,
    TEXT_PARAMS,
    TWO_PI,
} from './constants';

export type OptionsParams = {
    id: number;
    title: string;
    weight: string;
};

type optionNameParams = {
    startAngle: number;
    sliceAngle: number;
    options: OptionsParams;
    centerX: number;
    centerY: number;
};

type centerElement = {
    x: number;
    y: number;
    radius: number;
};

type sectionParams = {
    title: string;
    startAngle: number;
    endAngle: number;
};

export class WheelCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private sections: OptionsParams[];
    private centerElement: centerElement;
    private startAngle: number;
    public wheelState: WheelState;
    private centerX: number;
    private centerY: number;
    sectionsParams: sectionParams[];
    startTime: number;
    timerInput;
    buttons: ContainerView | undefined;
    message;
    soundHandler: SoundHandler | undefined;

    colors: string[];

    constructor(
        sections: OptionsParams[],

        timerInput?: HTMLInputElement,
        controllers?: ContainerView,
        message?: HTMLInputElement,
        soundHandler?: SoundHandler
    ) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.sections = sections;
        this.sectionsParams = [];
        this.centerElement = { x: 10, y: 10, radius: 20 };
        this.canvas.width = 420;
        this.canvas.height = 440;
        this.startAngle = 0;
        this.centerX = this.canvas.width / NUMBERS.HALF;
        this.centerY = this.canvas.height / NUMBERS.HALF;
        this.startTime = NUMBERS.ZERO;
        this.buttons = controllers;
        this.timerInput = timerInput;
        this.message = message;
        this.wheelState = WheelState.INITIAL;
        this.colors = this.getColors();
        this.soundHandler = soundHandler;
        this.drawWheel(Math.floor(Math.random() * (10 - 1)) + 10);
    }

    public drawWheel(startNumber: number): void {
        const totalWeight = this.sections.reduce((sum, option) => sum + Number(option.weight), NUMBERS.ZERO);
        const radius = this.canvas.width / NUMBERS.HALF;
        this.sectionsParams = [];
        let startAngle = startNumber;

        // отрисовка секций
        for (let i = 0; i < this.sections.length; i++) {
            let sectionAngle = (+this.sections[i].weight / totalWeight) * TWO_PI;
            if (this.context) {
                this.context.beginPath();
                this.context.moveTo(this.centerX, this.centerY);
                this.context.arc(this.centerX, this.centerY, radius, startAngle, startAngle + sectionAngle);
                this.context.closePath();
                const color = this.colors[i];
                this.context.fillStyle = color;
                this.context.fill();
                this.context.strokeStyle = 'rgba(255, 255, 255, 1)';
                this.context.stroke();
                this.addOptionName({
                    startAngle: startAngle,
                    sliceAngle: sectionAngle,
                    options: this.sections[i],
                    centerX: this.centerX,
                    centerY: this.centerY,
                });
                let SG = startAngle;
                this.sectionsParams.push({
                    title: this.sections[i].title,
                    startAngle: startAngle,
                    endAngle: startAngle + sectionAngle,
                });
            }
            startAngle += sectionAngle;
        }

        this.drawCursor();
        this.drawCenterElement(this.centerX, this.centerY);
        if (this.context) this.context.save();
    }

    private addOptionName(textParams: optionNameParams): void {
        const textAngle = textParams.startAngle + textParams.sliceAngle / NUMBERS.HALF;
        const title =
            textParams.options.title.length > TEXT_PARAMS.MAX_LENGTH
                ? textParams.options.title.slice(NUMBERS.ZERO, TEXT_PARAMS.MAX_LENGTH) + '...'
                : textParams.options.title;

        if (this.context) {
            const textWidth = this.context.measureText(title).width;
            const radius = textParams.centerX;
            const sectionAngle = textParams.sliceAngle;
            const sectionWidth = radius * sectionAngle;
            if (textWidth > sectionWidth) {
                return;
            }

            this.context.save();
            this.context.translate(
                textParams.centerX + (Math.cos(textAngle) * textParams.centerX) / NUMBERS.HALF,
                textParams.centerY + (Math.sin(textAngle) * textParams.centerY) / NUMBERS.HALF
            );
            this.context.rotate(textAngle);
            this.context.fillStyle = 'white';
            this.context.font = `bold ${TEXT_PARAMS.FONT_SIZE}px sans-serif`;
            this.context.shadowBlur = TEXT_PARAMS.SHADOW_BLUR;
            this.context.shadowOffsetX = TEXT_PARAMS.SHADOW_OFFSET_X;
            this.context.shadowOffsetY = TEXT_PARAMS.SHADOW_OFFSET_Y;
            this.context.shadowColor = TEXT_PARAMS.SHADOW_COLOR;
            this.context.fillStyle = TEXT_PARAMS.FILL_COLOR;
            this.context.fillText(title, -this.context.measureText(title).width / NUMBERS.HALF, NUMBERS.ZERO);

            this.context.restore();
        }

        textParams.startAngle += textParams.sliceAngle;
    }

    private drawCursor(): void {
        // координаты курсора
        const x = this.canvas.width;
        const y = this.canvas.height - this.canvas.width;

        const cursorX = x / NUMBERS.HALF;
        const cursorY = y;
        const cursorSize = CURSOR_SETTINGS.SIZE;
        const borderWidth = NUMBERS.HALF;

        // курсор (треугольник)
        if (this.context) {
            this.context.beginPath();
            this.context.moveTo(cursorX, cursorY);
            this.context.lineTo(cursorX - cursorSize, cursorY - cursorSize);
            this.context.lineTo(cursorX + cursorSize, cursorY - cursorSize);
            this.context.closePath();

            // цвет курсора
            this.context.fillStyle = CURSOR_SETTINGS.COLOR;
            this.context.fill();

            // цвет бордера для курсора
            this.context.lineWidth = borderWidth;
            this.context.strokeStyle = CURSOR_SETTINGS.BORDER_COLOR;
            this.context.stroke();
        }
    }

    private drawCenterElement(centerX: number, centerY: number): void {
        const { radius } = this.centerElement;

        // отрисовка центрального круга
        if (this.context) {
            this.context.beginPath();
            this.context.arc(centerX, centerY, radius, 0, TWO_PI); // Круг
            this.context.closePath();

            // цвета для центр. круга
            const grad = this.context.createLinearGradient(0, 0, 280, 0);
            grad.addColorStop(0, 'rgb(49, 22, 125)');
            grad.addColorStop(0.5, 'rgb(152, 205, 204)');
            grad.addColorStop(1, 'rgb(86, 56, 195)');
            this.context.fillStyle = grad;
            this.context.fill();

            // бордер центр. круга
            this.context.lineWidth = CENTER_ELEMENT_SETTINGS.BORDER_SIZE;
            this.context.strokeStyle = CENTER_ELEMENT_SETTINGS.BORDER_COLOR;
            this.context.stroke();
        }
    }

    public getHTMLElement(): HTMLElement & Partial<ElementCreator> {
        return this.canvas;
    }

    private generateRandomColor(): string {
        const hexCodes = HEX_CODES;
        let color = '';
        for (let i = 0; i < 6; i++) {
            color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
        }
        return '#' + color;
    }

    private getColors(): string[] {
        const length = this.sections.length;
        let colorsArr: string[] = [];
        for (let i = 0; i < length; i++) {
            const color = this.generateRandomColor();
            colorsArr.push(color);
        }
        return colorsArr;
    }

    public easeInOutBack(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    public rotate() {
        const duration = this.timerInput ? +this.timerInput.value : ANIMATION_PARAMS.DEFAULT_DURATION;
        const initialAngle = Math.random() * TWO_PI;
        const fullRotations =
            Math.floor(Math.random() * ANIMATION_PARAMS.DEFAULT_DURATION) + ANIMATION_PARAMS.DEFAULT_DURATION;
        const targetAngle = fullRotations * TWO_PI + initialAngle;
        this.startTime = performance.now();
        this.wheelState = WheelState.PICKING;
        this.disableElements();

        const animate = () => {
            const currentTime = performance.now();
            const elapsed = currentTime - this.startTime;
            const t = Math.min(elapsed / (duration * MS_PER_SEC), NUMBERS.ONE); //
            const easeValue = this.easeInOutBack(t);
            const currentRotation = initialAngle + easeValue * (targetAngle - initialAngle);
            this.drawWheel(currentRotation);

            if (t < NUMBERS.ONE) {
                requestAnimationFrame(animate);
                this.checkFinalSection(currentRotation);
            } else {
                this.wheelState = WheelState.PICKED;
                this.disableElements();
                if (this.soundHandler) {
                    this.soundHandler.playClick();
                }
                this.checkFinalSection(currentRotation + Math.PI);
            }
        };
        animate();
    }

    private checkFinalSection(currentRotation: number) {
        const target = POINTER_COORDINATES;

        this.sectionsParams.forEach((section) => {
            if (section.startAngle % TWO_PI <= target && target < section.endAngle % TWO_PI) {
                if (this.message) {
                    this.message.value = section.title;
                }
            }
        });
    }

    private disableElements() {
        if (this.buttons !== undefined) {
            const children = Array.from(this.buttons.getHTMLElement().children);
            if (this.wheelState === WheelState.PICKING) {
                children.forEach((elem) =>
                    elem instanceof HTMLElement
                        ? elem.classList.add('disabled')
                        : console.log('It does not an HTMLElement')
                );
                this.message?.classList.remove('disabled');
            } else if (this.wheelState === WheelState.PICKED) {
                children.forEach((elem) =>
                    elem instanceof HTMLElement
                        ? elem.classList.remove('disabled')
                        : console.log('It does not an HTMLElement')
                );
                this.message?.classList.add('disabled');
            }
        }
    }
}
