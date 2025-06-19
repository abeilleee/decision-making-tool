import { savedOption } from '../components/list-option/types';
import { OptionList } from '../components/list-option/optionList';
import { localStorageObject, SaveState } from './saveState';

export type jsonType = {
    lastId: [];
    optionList: savedOption[];
};

export class FileLoader {
    public saveState: SaveState;
    private list: OptionList;

    constructor(saveState: SaveState, list: OptionList) {
        this.saveState = saveState;
        this.list = list;
    }

    public openInterface(): void {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.addEventListener('change', (event) => {
            this.handleUploadedFile(event);
        });
        fileInput.click();
    }

    public updateOptionList(file: localStorageObject, optionList: OptionList): void {
        optionList.removeChildren();
        this.saveState.addDataFromFile(file);
        for (let i = 0; i < file.list.length; i++) {
            const id = file.list[i].id;
            const title = file.list[i].title;
            const weight = file.list[i].weight;
            optionList.addFilledOption(id, title, weight);
        }
    }

    private handleUploadedFile(event: Event): void {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                this.loadJsonFile(file);
            }
        }
    }

    private loadJsonFile(file: File): void {
        const reader = new FileReader();
        let jsonFile;

        reader.onload = (event): void => {
            if (event.target) {
                jsonFile = event.target.result;
                if (typeof jsonFile === 'string') {
                    jsonFile = JSON.parse(jsonFile);
                    const { list, lastId } = { ...jsonFile };
                    this.updateOptionList({ list, lastId }, this.list);
                }
            } else {
                console.error('Error while loading file');
            }
        };

        reader.readAsText(file);
    }
}
