export class State {
    #storageName: string = 'abeilleee_Option-List';
    data: Map<string, string>;

    constructor() {
        this.data = this.loadState();
        window.addEventListener('beforeunload', this.saveState.bind(this));
    }

    public setValue(storageName: string, value: string) {
        this.data.set(this.#storageName, value);
    }

    public getValue(storageName: string) {
        return this.data;
    }

    public saveState() {
        const data = Object.fromEntries(this.data.entries());
        localStorage.setItem(this.#storageName, JSON.stringify(data));
    }

    public loadState(): Map<string, string> {
        const data = localStorage.getItem(this.#storageName);
        if (data) {
            const dataArr = JSON.parse(data);
            return new Map(Object.entries(dataArr));
        }

        return new Map();
    }
}
