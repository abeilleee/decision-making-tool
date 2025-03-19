export class soundHandler {
    storageName = 'abeilleee_isMute';
    isMute = false;
    endSound: HTMLAudioElement;

    constructor() {
        this.endSound = new Audio('./assets/sounds/sound.wav');
    }

    playClick() {
        if (!this.isMute) {
            this.endSound.src = './assets/sounds/sound.wav';
            this.endSound.play();
        }
    }

    private setSoundHandler(): void {
        if (!localStorage.getItem(this.storageName)) {
            localStorage.setItem(this.storageName, 'true');
        }
    }

    public setSoundOption() {
        this.isMute = !this.isMute;
        localStorage.setItem(this.storageName, this.isMute.toString());
    }
}
