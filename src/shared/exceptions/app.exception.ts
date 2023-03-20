const APP_ERROR = 'App error';

export class AppException implements Error {
    message: string;
    name: string;
    statusCode: number;
    result: any;

    constructor(message: string, statusCode?: number, name?: string, result?: any) {
        this.name = name || APP_ERROR;
        this.message = message;
        this.statusCode = statusCode;
        this.result = result;
    }
}