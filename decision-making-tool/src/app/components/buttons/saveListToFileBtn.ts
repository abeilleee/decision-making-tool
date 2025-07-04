import { DataExporter } from '../../services/dataExporter';
import { Button } from './button';
import { ButtonsName } from './enums';

export class SaveListButton extends Button {
    public dataExporter: DataExporter;

    constructor(dataExporter: DataExporter) {
        super(ButtonsName.SAVE_LIST_TO_FILE, ['save-list-btn']);
        this.dataExporter = dataExporter;
    }

    public handleClick(dataExporter: DataExporter): void {
        dataExporter.exportDataToJson();
    }
}
