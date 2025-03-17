type OptionsParams = {
    name: string;
    weight: number;
};

type centerElement = {
    x: number;
    y: number;
    radius: number;
};

export class WheelCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private sections: string[];
    private cursorIndex: number;
    private centerElement: centerElement;

    constructor(sections: string[]) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.sections = sections;
        this.cursorIndex = 0;
        this.centerElement = { x: 10, y: 10, radius: 10 };
        this.canvas.width = 420;
        this.canvas.height = 440;
        this.drawWheel();
    }

    private drawWheel() {
        const radius = Math.min(this.canvas.width, this.canvas.height) / 2;
        // const sectionAngle = (2 * Math.PI) / this.sections.length; // угол для секции
        const sectionAngle = (2 * Math.PI) / this.sections.length; // угол для секции
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // отрисовка секций
        for (let i = 0; i < this.sections.length; i++) {
            const startAngle = i * sectionAngle;
            const endAngle = (i + 1) * sectionAngle;

            this.context.beginPath();
            this.context.moveTo(centerX, centerY);
            this.context.arc(centerX, centerY, radius, startAngle, endAngle);
            this.context.closePath();
            this.context.fillStyle = `hsl(${(i * 360) / this.sections.length}, 100%, 50%)`;
            this.context.fill();
        }

        this.drawCursor();
        this.drawCenterElement(centerX, centerY);
    }

    private drawCursor() {
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

    private drawCenterElement(centerX: number, centerY: number) {
        const { radius } = this.centerElement;

        // отрисовка центрального круга
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Круг
        this.context.closePath();

        // цвета для центр. круга
        this.context.fillStyle = '#5f2fb9';
        this.context.fill();

        // бордер центр. круга
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        this.context.stroke();
    }

    public getHTMLElement(): HTMLElement {
        return this.canvas;
    }
}
