import { ElementCreator } from '../../utils/element-creator';
import { ContainerView } from '../container/container';
import { WheelState } from './types';

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

export class WheelCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private sections: OptionsParams[];
    private cursorIndex: number;
    private centerElement: centerElement;
    private startAngle: number;
    public wheelState: WheelState;
    private centerX: number;
    private centerY: number;
    animationFrameId: number | null = null;
    startTime: number;
    speed: number;
    acceleration: number;
    timerInput;
    buttons: ContainerView | undefined;

    colors: string[];

    constructor(sections: OptionsParams[], timerInput?: HTMLInputElement, controllers?: ContainerView) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.sections = sections;
        this.cursorIndex = 0;
        this.centerElement = { x: 10, y: 10, radius: 20 };
        this.canvas.width = 420;
        this.canvas.height = 440;
        this.startAngle = 0;

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.startTime = 0;
        this.speed = 0.01;
        this.acceleration = 0.002;
        this.buttons = controllers;

        this.timerInput = timerInput;
        this.wheelState = WheelState.INITIAL;
        this.colors = this.getColors();
        this.drawWheel(Math.random() * 2);
    }

    public drawWheel(startNumber: number): void {
        const totalWeight = this.sections.reduce((sum, option) => sum + Number(option.weight), 0);
        const radius = this.canvas.width / 2;

        let startAngle = startNumber;

        // отрисовка секций
        for (let i = 0; i < this.sections.length; i++) {
            let sectionAngle = (+this.sections[i].weight / totalWeight) * 2 * Math.PI;
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
            }
            startAngle += sectionAngle;
        }

        this.drawCursor();
        this.drawCenterElement(this.centerX, this.centerY);
        if (this.context) this.context.save();
    }

    public getSaveCtx(): void {
        this.drawWheel;
    }

    private addOptionName(textParams: optionNameParams): void {
        const textAngle = textParams.startAngle + textParams.sliceAngle / 2;
        const title =
            textParams.options.title.length > 15
                ? textParams.options.title.slice(1, 15) + '...'
                : textParams.options.title;
        if (this.context) {
            this.context.save();
            this.context.translate(
                textParams.centerX + (Math.cos(textAngle) * textParams.centerX) / 2,
                textParams.centerY + (Math.sin(textAngle) * textParams.centerY) / 2
            );
            this.context.rotate(textAngle);
            this.context.fillStyle = 'white';
            this.context.font = 'bold 16px sans-serif';
            this.context.shadowBlur = 15;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.shadowColor = 'black';
            this.context.fillStyle = 'white';
            this.context.fillText(title, -this.context.measureText(title).width / 2, 0);

            this.context.restore();
        }

        textParams.startAngle += textParams.sliceAngle;
    }

    private drawCursor(): void {
        // координаты курсора
        const x = this.canvas.width;
        const y = this.canvas.height - this.canvas.width;

        const cursorX = x / 2;
        const cursorY = y;
        const cursorSize = 17;
        const borderWidth = 2;

        // курсор (треугольник)
        if (this.context) {
            this.context.beginPath();
            this.context.moveTo(cursorX, cursorY);
            this.context.lineTo(cursorX - cursorSize, cursorY - cursorSize);
            this.context.lineTo(cursorX + cursorSize, cursorY - cursorSize);
            this.context.closePath();

            // цвет курсора
            this.context.fillStyle = 'rgba(68, 0, 255, 0.8)';
            this.context.fill();

            // цвет бордера для курсора
            this.context.lineWidth = borderWidth;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        }
    }

    private drawCenterElement(centerX: number, centerY: number): void {
        const { radius } = this.centerElement;

        // отрисовка центрального круга
        if (this.context) {
            this.context.beginPath();
            this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Круг
            this.context.closePath();

            // цвета для центр. круга
            const grad = this.context.createLinearGradient(0, 0, 280, 0);
            grad.addColorStop(0, 'rgb(49, 22, 125)');
            grad.addColorStop(0.5, 'rgb(152, 205, 204)');
            grad.addColorStop(1, 'rgb(86, 56, 195)');
            this.context.fillStyle = grad;
            this.context.fill();

            // бордер центр. круга
            this.context.lineWidth = 2;
            this.context.strokeStyle = 'white';
            this.context.stroke();
        }
    }

    public getHTMLElement(): HTMLElement & Partial<ElementCreator> {
        return this.canvas;
    }

    private generateRandomColor(): string {
        const hexCodes = '0123456789ABCDEF';
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

    public easeOut(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // public rotate() {
    //     // if (this.wheelState === WheelState.PICKING) {
    //     //     return;
    //     // }
    //     // this.wheelState = WheelState.PICKING;

    //     if ((this.startTime = 0)) {
    //         this.startTime = performance.now();
    //     }
    //     const duration = this.timerInput ? +this.timerInput.value : 0;
    //     const durationMs = duration * 1000;
    //     const totalRotations = 5;
    //     const currentTime = performance.now();
    //     const elapsed = currentTime - this.startTime;
    //     const t = Math.min(elapsed / durationMs, 1);
    //     const eased = this.easeInOutBack(t);

    //     this.startAngle += eased * (totalRotations * 360) + Math.random() * 360;
    //     this.drawWheel();
    //     requestAnimationFrame(() => this.rotate());
    // }

    public easeInOutBack(t: number) {
        // return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        // return t < 0.5 ? 4 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        // return 1 - Math.pow(1 - t, 3);
        const s = 1.70158;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((s + 1) * 2 * t - s)) / 2
            : (Math.pow(2 * t - 2, 2) * ((s + 1) * (2 * t - 2) + s) + 2) / 2;

        // return t < 0.5
        //     ? 4 * t * t * t
        //     : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    // public startAnimation(duration: number) {
    //     if (this.wheelState === WheelState.PICKING) {
    //         return;
    //     }
    //     this.wheelState = WheelState.PICKING;
    //     const startTime = performance.now();
    //     const totalRotations = 5;
    //     const durationMs = duration * 1000;

    //     const animate = (time: number) => {
    //         const elapsed = time - startTime;
    //         const t = Math.min(elapsed / durationMs, 1);
    //         const easing = this.easeInOutBack(t);
    //         this.startAngle += easing * (totalRotations * 360) + Math.random() * 360;

    //         this.drawWheel();

    //         if (t < 1) {
    //             requestAnimationFrame(() => animate);
    //         } else {
    //             this.wheelState = WheelState.PICKED;
    //             this.endAnimation();
    //         }
    //     };
    //     requestAnimationFrame(() => animate);
    // }

    // public rotate() {
    //     const duration = this.timerInput ? +this.timerInput.value : 0;

    //     if ((this.startTime = 0)) {
    //         this.startTime = performance.now();
    //     }
    //     this.wheelState = WheelState.PICKING;

    //     let currentTime = performance.now();
    //     const durationMs = duration * 1000;
    //     const numberOfSections = this.sections.length;

    //     const elapsedTime = currentTime - this.startTime;
    //     let t = Math.min(elapsedTime / durationMs, 1);
    //     const easeValue = this.easeInOutBack(t);

    //     const rotationAmount = easeValue * Math.PI * numberOfSections; // Полный оборот
    //     this.startAngle += easeValue * (rotationAmount * 360) + Math.random() * 360;
    //     this.drawWheel();
    //     if (t < 1) {
    //         requestAnimationFrame(() => this.rotate());
    //     } else {
    //         this.endAnimation();
    //         currentTime = 0;
    //         this.wheelState = WheelState.PICKED;
    //     }
    // }

    // public rotate() {
    //     const duration = this.timerInput ? +this.timerInput.value : 0;
    //     const durationMs = duration * 1000;
    //     const totalRotations = 5;

    //     const targetAngleStop = 2 * Math.PI * totalRotations + Math.random() * (2 * Math.PI); //
    //     const startTime = performance.now();

    //     const animate = (currentTime: number) => {
    //         const elapsed = currentTime - startTime;
    //         const t = Math.min(elapsed / durationMs, 1);
    //         const easing = this.easeInOutBack(t);

    //         this.startAngle += easing * targetAngleStop;
    //         this.drawWheel();

    //         if (t < 1) {
    //             this.animationFrameId = requestAnimationFrame(() => animate);
    //         } else {
    //             this.animationFrameId = null;
    //             this.endAnimation;
    //         }
    //     };
    //     if (this.animationFrameId !== null) {
    //         cancelAnimationFrame(this.animationFrameId);
    //     }
    //     this.animationFrameId = requestAnimationFrame(() => animate);
    // }

    public rotate() {
        const duration = this.timerInput ? +this.timerInput.value : 0;
        this.wheelState = WheelState.PICKING;
        this.disableElements();
        if (this.startTime === 0) {
            this.startTime = performance.now();
        }
        const durationMs = duration * 1000;
        let currentTime = performance.now();
        const elapsedTime = currentTime - this.startTime;
        let t = Math.min(elapsedTime / durationMs, 1);
        const easeValue = this.easeInOutBack(t);
        const rotationAmount = easeValue * 5;
        this.startAngle += rotationAmount;
        // this.startAngle += easeValue * (rotationAmount * 360) + Math.random() * 360;
        this.drawWheel(this.startAngle);

        if (t < 1) {
            // this.startAngle += rotationAmount - 1;
            requestAnimationFrame(() => this.rotate());
        } else {
            this.wheelState = WheelState.PICKED;
            this.startTime = 0;
            this.disableElements();
        }
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
            } else {
                children.forEach((elem) =>
                    elem instanceof HTMLElement
                        ? elem.classList.remove('disabled')
                        : console.log('It does not an HTMLElement')
                );
            }
        }
    }
}
