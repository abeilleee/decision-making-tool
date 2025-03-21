import { Option } from '../components/list-option/option';
import { OptionList } from '../components/list-option/optionList';
import { savedOption } from '../components/list-option/types';
import { OptionsParams } from '../components/wheel/types';

export type localStorageObject = {
    list: savedOption[];
    lastId: number;
};

export class SaveState {
    storageName: string = 'abeilleee_Option-List';
    #defaultValue: localStorageObject = { list: [{ id: 1, title: '', weight: '' }], lastId: 1 };

    public initializeLocalStorage(parent: OptionList): localStorageObject | undefined {
        let data;
        if (!localStorage.getItem(this.storageName)) {
            localStorage.setItem(this.storageName, JSON.stringify(this.#defaultValue));
            new Option(parent.getHTMLElement(), this.#defaultValue.lastId);
        } else {
            data = this.getData();
        }
        if (data) return data;
    }

    public getData(): localStorageObject {
        let storedData: localStorageObject = this.#defaultValue;
        const dataFromStorage = localStorage.getItem(this.storageName);
        if (dataFromStorage) {
            storedData = JSON.parse(dataFromStorage);
        } else {
            console.error('There is not any data in local storage');
        }
        return storedData;
    }

    public getLastId(type: string): number | undefined {
        const dataFromStorage = localStorage.getItem(this.storageName);
        let storedData: localStorageObject;
        let lastId;
        if (dataFromStorage) {
            storedData = JSON.parse(dataFromStorage);
            lastId = Number(storedData.lastId);
            if (type === 'add') {
                lastId++;
                storedData.lastId = lastId;
            } else if (type === 'clear') {
                storedData.lastId = 0;
            } else if (type === 'delete') {
                const optionList = storedData.list;
                if (optionList.length === 0) {
                    storedData.lastId = 0;
                }
            }
            localStorage.setItem(this.storageName, JSON.stringify(storedData));
        } else {
            console.error('The lastId is not found');
        }
        return lastId;
    }

    public addToLocalStorage(option: Option): void {
        if (option.id?.textContent) {
            const id = +option.id.textContent.slice(1);
            const title = option.titleInput?.textContent ? option.titleInput.textContent : '';
            const weight = option.weightInput?.textContent ? option.weightInput.textContent : '';
            const data = {
                id: id,
                title: title,
                weight: weight,
            };
            const dataFromStorage = localStorage.getItem(this.storageName);

            if (data && typeof dataFromStorage === 'string') {
                const storedData: localStorageObject = JSON.parse(dataFromStorage);
                storedData.list.push(data);
                storedData.lastId = Number(data.id);
                localStorage.setItem(this.storageName, JSON.stringify(storedData));
            }
        }
    }

    public removeFromLocalStorage(element: HTMLLIElement): void {
        const id = Number(element.firstChild?.textContent?.split('').slice(1));
        const storedData = localStorage.getItem(this.storageName);
        if (storedData && storedData.length > 1) {
            const arr: localStorageObject = JSON.parse(storedData);
            const filteredList = arr.list.filter((element) => element.id !== id);
            arr.list = filteredList;
            localStorage.setItem(this.storageName, JSON.stringify(arr));
        }
    }

    public saveInputData(id: number, title: string, weight: string): void {
        const data = { id: id, title: title, weight: weight };
        const dataFromStorage = localStorage.getItem(this.storageName);
        if (typeof dataFromStorage === 'string') {
            const storedData: localStorageObject = JSON.parse(dataFromStorage);
            storedData.list.push(data);
            storedData.lastId = Number(data.id);
            localStorage.setItem(this.storageName, JSON.stringify(storedData));
        }
    }

    public cleanStorage(): void {
        localStorage.setItem(this.storageName, JSON.stringify({ list: [], lastId: 0 }));
    }

    public addDataFromFile(obj: localStorageObject): void {
        localStorage.removeItem(this.storageName);
        localStorage.setItem(this.storageName, JSON.stringify(obj));
    }

    public getFilledOptions(): OptionsParams[] {
        const data = this.getData();
        const optionsList = data.list;
        let filledOptions = [];
        for (let i = 0; i < optionsList.length; i++) {
            if (optionsList[i].title !== '' && Number(optionsList[i].weight) > 0) {
                filledOptions.push(optionsList[i]);
            }
        }
        return filledOptions;
    }
}
