import { savedOption } from '../list-option/types';
import { OptionList } from '../list-option/optionList';
import { localStorageObject, SaveState } from '../save-state/saveState';

export type jsonType = {
    lastId: [];
    optionList: savedOption[];
};

export class FileLoader {
    saveState: SaveState;
    list: OptionList;
    constructor(saveState: SaveState, list: OptionList) {
        this.saveState = saveState;
        this.list = list;
    }

    public openInterface(optionList: OptionList) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.addEventListener('change', (event) => {
            this.handleUploadedFile(event, optionList);
        });
        fileInput.click();
    }

    private handleUploadedFile(event: Event, optionList: OptionList): void {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                const result = this.loadJsonFile(file);
                console.log('res' + result);
            }
        }
    }

    private loadJsonFile(file: File) {
        const reader = new FileReader();
        let jsonFile;
        reader.onload = (event) => {
            if (event.target) {
                jsonFile = event.target.result;
                if (typeof jsonFile === 'string') {
                    jsonFile = JSON.parse(jsonFile);
                    const result = jsonFile;
                    const res = { ...result };
                    this.updateOptionList(res, this.list, this.saveState);
                }
            } else {
                console.error('Error while loading file');
            }
        };
        reader.readAsText(file);
    }

    public updateOptionList(file: localStorageObject, optionList: OptionList, saveState: SaveState): void {
        optionList.removeChildren();
        this.saveState.cleanStorage();
        this.saveState.addDataFromFile(file);
        for (let i = 0; i < file.list.length; i++) {
            const id = file.list[i].id;
            const title = file.list[i].title;
            const weight = file.list[i].weight;
            optionList.addFilledOption(id, title, weight);
        }
    }
}
