import { ElementCreator } from '../../utils/element-creator';
import { SoundHandler } from '../../services/soundHandler';
import { ContainerView } from '../../view/container/container';
import { optionNameParams, OptionsParams, sectionParams, WheelState } from './types';
import {
    ANIMATION_PARAMS,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CENTER_ELEMENT_RADIUS,
    CENTER_ELEMENT_SETTINGS,
    CURSOR_SETTINGS,
    MS_PER_SEC,
    NUMBERS,
    POINTER_COORDINATES,
    START_RANDOM_ANGLE,
    TEXT_PARAMS,
    TWO_PI,
} from './constants';
import { easeInOutBack, generateRandomColor } from './utils';

export class WheelCanvas {
    public colors: string[];
    public wheelState: WheelState = WheelState.INITIAL;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private sections: OptionsParams[];
    private startAngle: number = START_RANDOM_ANGLE;
    private centerX: number;
    private centerY: number;
    private sectionsParams: sectionParams[];
    private startTime: number;
    private timerInput;
    private buttons: ContainerView | undefined;
    private message;
    private soundHandler: SoundHandler | undefined;

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
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.centerX = this.canvas.width / NUMBERS.HALF;
        this.centerY = this.canvas.height / NUMBERS.HALF;
        this.startTime = NUMBERS.ZERO;
        this.buttons = controllers;
        this.timerInput = timerInput;
        this.message = message;
        this.colors = this.getColors();
        this.soundHandler = soundHandler;
        this.drawWheel(this.startAngle);
    }

    public drawWheel(startNumber: number): void {
        const totalWeight = this.sections.reduce((sum, option) => sum + Number(option.weight), NUMBERS.ZERO);
        const radius = this.canvas.width / NUMBERS.HALF;
        this.sectionsParams = [];
        let startAngle = startNumber;

        // отрисовка секций
        for (let i = 0; i < this.sections.length; i++) {
            const sectionAngle = (+this.sections[i].weight / totalWeight) * TWO_PI;

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

    public getHTMLElement(): HTMLElement & Partial<ElementCreator> {
        return this.canvas;
    }

    public rotate(): void {
        const duration = this.timerInput ? +this.timerInput.value : ANIMATION_PARAMS.DEFAULT_DURATION;
        const initialAngle = Math.random() * TWO_PI;
        const fullRotations =
            Math.floor(Math.random() * ANIMATION_PARAMS.DEFAULT_DURATION) + ANIMATION_PARAMS.DEFAULT_DURATION;
        const targetAngle = fullRotations * TWO_PI + initialAngle;
        this.startTime = performance.now();
        this.wheelState = WheelState.PICKING;
        this.disableElements();

        const animate = (): void => {
            const currentTime = performance.now();
            const elapsed = currentTime - this.startTime;
            const t = Math.min(elapsed / (duration * MS_PER_SEC), NUMBERS.ONE); //
            const easeValue = easeInOutBack(t);
            const currentRotation = initialAngle + easeValue * (targetAngle - initialAngle);
            this.drawWheel(currentRotation);

            if (t < +NUMBERS.ONE) {
                requestAnimationFrame(animate);
                this.checkFinalSection();
            } else {
                this.wheelState = WheelState.PICKED;
                this.disableElements();
                if (this.soundHandler) {
                    this.soundHandler.playClick();
                }
                this.checkFinalSection();
            }
        };
        animate();
    }

    private addOptionName(textParams: optionNameParams): void {
        const textAngle = textParams.startAngle + textParams.sliceAngle / NUMBERS.HALF;
        const title =
            textParams.options.title.length > +TEXT_PARAMS.MAX_LENGTH
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
        const radius = CENTER_ELEMENT_RADIUS;

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

    private getColors(): string[] {
        const length = this.sections.length;
        const colorsArr: string[] = [];

        for (let i = 0; i < length; i++) {
            const color = generateRandomColor();
            colorsArr.push(color);
        }

        return colorsArr;
    }

    private checkFinalSection(): void {
        const target = POINTER_COORDINATES;

        this.sectionsParams.forEach((section) => {
            if (section.startAngle % TWO_PI <= target && target < section.endAngle % TWO_PI) {
                if (this.message) {
                    this.message.value = section.title;
                }
            }
        });
    }

    private disableElements(): void {
        if (this.buttons !== undefined) {
            if (this.wheelState === WheelState.PICKING) {
                this.buttons.toggleDisable('add');
                this.message?.classList.remove('disabled');
            } else if (this.wheelState === WheelState.PICKED) {
                this.buttons.toggleDisable('remove');
                this.message?.classList.add('disabled');
            }
        }
    }
}
