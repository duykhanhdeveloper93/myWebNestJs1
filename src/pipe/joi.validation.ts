import { PipeTransform, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { map } from 'lodash';
import { JoiEnum } from 'src/common/00.enum/joi.enum';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any) {
        const { error } = this.schema.validate(value);

        const customError = map(error?.details, (e) => {
            if (e.message.includes('must be') || e.context?.regex) {
                return {
                    property: e.context.label,
                    content: JoiEnum.INVALID,
                };
            }

            if (e.type === 'any.required') {
                return {
                    property: e.context.label,
                    content: JoiEnum.REQUIRED,
                };
            }

            return {
                property: e.context.label,
                content: JoiEnum.IS_REQUIRED_OR_INVALID,
            };
        });
        if (error) {
            throw new UnprocessableEntityException(customError, {
                description: 'INVALID_DATA',
            });
        }
        return value;
    }
}

@Injectable()
export class JoiValidationMutiplePipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any) {
        const { error } = this.schema.validate(value, { abortEarly: false });
        const customError = map(error?.details, (e, index) => {
            return {
                index: index,
                property: e.context.label,
                content: JoiEnum.IS_REQUIRED_OR_INVALID,
            };
        });
        if (error) {
            throw new UnprocessableEntityException(customError, {
                description: 'INVALID_DATA',
            });
        }
        return value;
    }
}

export class ChangePwValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any) {
        const { error } = this.schema.validate(value);
        const customError = map(error?.details, (e) => {
            if (e.type === 'any.only' && e.path.includes('matchingNewPassword')) {
                return {
                    property: e.context.label,
                    content: JoiEnum.MUST_BE_MATCHING_PW,
                };
            }
            return {
                property: e.context.label,
                content: JoiEnum.IS_REQUIRED_OR_INVALID,
            };
        });
        if (error) {
            throw new UnprocessableEntityException(customError, {
                description: 'INVALID_DATA',
            });
        }
        return value;
    }
}

@Injectable()
export class RegisterUserJoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any) {
        const { error } = this.schema.validate(value);

        const customError = map(error?.details, (e) => {
            if (e.type === 'any.only' && e.context.label === 'matchingPassword') {
                return {
                    property: e.context.label,
                    content: JoiEnum.MUST_BE_MATCHING_PW,
                };
            }

            if (e.type === 'string.pattern.base' && e.context.label === 'password') {
                return {
                    property: e.context.label,
                    content: JoiEnum.MUST_BE_CORRECT_WITH_REQUIREMENTS,
                };
            }

            return {
                property: e.context.label,
                content: JoiEnum.IS_REQUIRED_OR_INVALID,
            };
        });
        if (error) {
            throw new UnprocessableEntityException(customError, {
                description: 'INVALID_DATA',
            });
        }
        return value;
    }
}
