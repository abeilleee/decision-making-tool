export class SoundHandler {
    private storageName = 'abeilleee_isMute';
    private endSound: HTMLAudioElement;

    constructor() {
        this.endSound = new Audio('assets/audio/sound.mp3');
    }

    public playClick(): void {
        const data = this.getData();

        if (data === 'false') {
            this.endSound.src = 'assets/audio/sound.mp3';
            this.endSound.play().catch((error) => console.error(error));
        }
    }

    public setSoundHandler(): void {
        if (!localStorage.getItem(this.storageName)) {
            localStorage.setItem(this.storageName, 'false');
        }
    }

    public setSoundOption(): void {
        const data = this.getData();
        const isMute = data !== 'true';

        localStorage.setItem(this.storageName, isMute.toString());
    }

    public getData(): string | undefined {
        const data = localStorage.getItem(this.storageName);

        if (data) return data;
    }
}
