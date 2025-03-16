import { DataExporter } from '../file-loader.ts/dataExporter';
import { Button } from './button';
import { ButtonsName } from './types';

export class SaveListButton extends Button {
    dataExporter: DataExporter;
    constructor(dataExporter: DataExporter) {
        super(ButtonsName.SAVE_LIST_TO_FILE, ['save-list-btn']);
        this.dataExporter = dataExporter;
    }

    public handleClick(dataExporter: DataExporter) {
        dataExporter.exportDataToJson();
    }
}
