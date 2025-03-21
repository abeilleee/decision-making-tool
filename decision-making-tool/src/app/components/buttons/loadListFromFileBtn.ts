import { FileLoader } from '../../services/fileLoader';
import { Button } from './button';
import { ButtonsName } from './enums';

export class LoadListButton extends Button {
    constructor() {
        super(ButtonsName.LOAD_LIST_FROM_FILE, ['load-list-btn']);
    }

    public handleClick(fileLoader: FileLoader): void {
        fileLoader.openInterface();
    }
}
