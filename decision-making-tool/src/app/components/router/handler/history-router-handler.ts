import { RouterHandlerOptions, UserRequest } from '../types';

export class HistoryRouterHandler {
    callback: (arg: UserRequest) => void;
    options: RouterHandlerOptions;
    handler: (url: string | PopStateEvent | Event) => void;

    constructor(callback: (arg: UserRequest) => void) {
        this.options = {
            locationKey: 'pathname',
            event: 'popstate',
        };
        this.callback = callback;
        this.handler = this.navigate.bind(this);
        window.addEventListener(this.options.event, this.handler);
    }

    public navigate(url: string | PopStateEvent | Event): void {
        if (typeof url === 'string') {
            this.setHistory(url);
        }
        const urlString = window.location.pathname.slice(1);
        const result: UserRequest = { path: '', resource: '' };
        const path = urlString.split('/');
        [result.path = '', result.resource = ''] = path;
        this.callback(result);
    }

    public disable(): void {
        window.removeEventListener(this.options.event, this.handler);
    }

    public setHistory(url: string) {
        window.history.pushState(null, '', `/${url}`);
    }
}
