export type Route = {
    path: string;
    callback: (request: string) => void;
};

export type RouterHandlerOptions = {
    locationKey: string;
    event: string;
};

export type UserRequest = {
    path: string;
    resource: string;
};

export enum Pages {
    INDEX = 'index',
    DECISION_PICKER = 'decision-picker',
    NOT_FOUND = 'not-found',
}
