import { SaveState } from '../save-state/saveState';

export class dataExporter {
    saveState: SaveState;

    constructor(saveState: SaveState) {
        this.saveState = saveState;
    }

    public exportDataToJson(): void {
        const data = this.saveState.getData();
        const resultStr = JSON.stringify(data);
    }
}
