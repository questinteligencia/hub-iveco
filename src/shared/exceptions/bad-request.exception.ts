import { AppException } from './app.exception';

const STATUS_CODE: number = 400;
const APP_ERROR = 'Bad request error';

export class BadRequestException extends AppException {

    constructor(message: string) {
        super(message, STATUS_CODE, APP_ERROR);
    }
}