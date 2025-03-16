import { RouterHandlerOptions, UserRequest } from '../types';
import { HistoryRouterHandler } from './history-router-handler';

export class HashRouterHandler extends HistoryRouterHandler {
    options: RouterHandlerOptions;

    constructor(callbackRouter: (arg: UserRequest) => void) {
        super(callbackRouter);

        this.options = {
            locationKey: 'hash',
            event: 'hashchange',
        };

        window.addEventListener(this.options.event, this.handler);
    }

    setHistory(url: string) {
        window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
    }
}
