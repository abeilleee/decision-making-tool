import { savedOption } from '../../types';
import { OptionList } from '../list-option/optionList';
import { SaveState } from '../save-state/saveState';

export type jsonType = {
    lastId: [];
    optionList: savedOption[];
};

export class FileLoader {
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
                this.loadJsonFile(file, optionList);
            }
        }
    }

    private loadJsonFile(file: File, optionList: OptionList) {
        const reader = new FileReader();
        let jsonFile;
        reader.onload = function (event) {
            if (event.target) {
                jsonFile = event.target.result;
                if (typeof jsonFile === 'string') {
                    jsonFile = JSON.parse(jsonFile);
                    console.log(jsonFile);
                }
            } else {
                console.error('Error while loading file');
            }
        };

        reader.readAsText(file);
    }

    public updateOptionList(file: jsonType, optionList: OptionList, saveState: SaveState): void {
        const lastId = file.lastId;
        optionList.removeChildren();
        saveState.cleanStorage();
        for (let i = 0; i < file.optionList.length; i++) {
            const id = file.optionList[i].id;
            const title = file.optionList[i].title;
            const weight = file.optionList[i].weight;
            optionList.addFilledOption(id, title, weight);
        }
    }
}
