import { FileLoader } from '../file-loader.ts/fileLoader';
import { OptionList } from '../list-option/optionList';
import { Button } from './button';
import { ButtonsName } from './types';

export class LoadListButton extends Button {
    constructor() {
        super(ButtonsName.LOAD_LIST_FROM_FILE, ['load-list-btn']);
    }

    public handleClick(fileLoader: FileLoader, optionList: OptionList): void {
        fileLoader.openInterface(optionList);
    }
}
