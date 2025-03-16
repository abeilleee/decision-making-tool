import { SaveState } from '../save-state/saveState';

export class DataExporter {
    saveState: SaveState;

    constructor(saveState: SaveState) {
        this.saveState = saveState;
    }

    public exportDataToJson(): void {
        const data = this.saveState.getData();
        const blob = new Blob([JSON.stringify(data, null, 2)]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
