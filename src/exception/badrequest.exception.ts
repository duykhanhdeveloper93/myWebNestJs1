import { BadRequestException, HttpStatus } from '@nestjs/common';

export interface CError {
    message: string;
    status: HttpStatus;
    options: any;
    response: string;
}
export class CBadRequestException extends BadRequestException {
    constructor(msg?: string | number) {
        super(msg);
    }
}
