type OptionsParams = {
    name: string;
    weight: number;
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
    private context: CanvasRenderingContext2D;
    private sections: OptionsParams[];
    private cursorIndex: number;
    private centerElement: centerElement;

    constructor(sections: OptionsParams[]) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.sections = sections;
        this.cursorIndex = 0;
        this.centerElement = { x: 10, y: 10, radius: 20 };
        this.canvas.width = 420;
        this.canvas.height = 440;
        this.drawWheel();
    }

    private drawWheel(): void {
        const totalWeight = this.sections.reduce((sum, option) => sum + option.weight, 0);
        const radius = this.canvas.width / 2;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        let startAngle = 0;

        // отрисовка секций
        for (let i = 0; i < this.sections.length; i++) {
            let sectionAngle = (this.sections[i].weight / totalWeight) * 2 * Math.PI;

            this.context.beginPath();
            this.context.moveTo(centerX, centerY);
            this.context.arc(centerX, centerY, radius, startAngle, startAngle + sectionAngle);
            this.context.closePath();
            this.context.fillStyle = `hsl(${(i * 360) / this.sections.length}, 90%, 50%)`;
            this.context.fill();
            this.context.strokeStyle = 'rgba(255, 255, 255, 1)';
            this.context.stroke();
            this.addOptionName({
                startAngle: startAngle,
                sliceAngle: sectionAngle,
                options: this.sections[i],
                centerX: centerX,
                centerY: centerY,
            });
            startAngle += sectionAngle;
        }

        this.drawCursor();
        this.drawCenterElement(centerX, centerY);
    }

    private addOptionName(textParams: optionNameParams): void {
        const textAngle = textParams.startAngle + textParams.sliceAngle / 2;
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
        this.context.fillText(textParams.options.name, -this.context.measureText(textParams.options.name).width / 2, 0);

        this.context.restore();

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

    private drawCenterElement(centerX: number, centerY: number): void {
        const { radius } = this.centerElement;

        // отрисовка центрального круга
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

    public getHTMLElement(): HTMLElement {
        return this.canvas;
    }
}
