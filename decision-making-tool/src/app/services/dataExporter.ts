import { SaveState } from './saveState';
import { NUMBERS } from '../components/wheel/constants';

export class DataExporter {
    private saveState: SaveState;

    constructor(saveState: SaveState) {
        this.saveState = saveState;
    }

    public exportDataToJson(): void {
        const data = this.saveState.getData();
        const blob = new Blob([JSON.stringify(data, null, NUMBERS.HALF)]);
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
