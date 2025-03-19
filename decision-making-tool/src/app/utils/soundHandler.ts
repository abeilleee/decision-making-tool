export class SoundHandler {
    storageName = 'abeilleee_isMute';

    endSound: HTMLAudioElement;

    constructor() {
        this.endSound = new Audio('./assets/sounds/sound.wav');
    }

    playClick() {
        const data = this.getData();
        if (!data) {
            this.endSound.src = './assets/sounds/sound.wav';
            this.endSound.play();
        }
    }

    public setSoundHandler(): void {
        if (!localStorage.getItem(this.storageName)) {
            localStorage.setItem(this.storageName, 'true');
        }
    }

    public setSoundOption(): void {
        const data = this.getData();
        console.log(data);
        const isMute = data === 'true' ? false : true;
        // console.log(isMute);
        JSON.stringify(localStorage.setItem(this.storageName, isMute.toString()));
    }

    public getData(): string | undefined {
        const data = localStorage.getItem(this.storageName);
        if (data) return data;
    }
}
