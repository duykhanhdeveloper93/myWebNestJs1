import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { isObject } from 'lodash';

/**
 * Tranform the dto before do other actions of current request.
 */
@Injectable()
export class TransformPipe implements PipeTransform<any, number> {
    private trim(values) {
        Object.keys(values).forEach((key) => {
            if (key !== 'passwordHash' && key !== 'passwordHashTemp') {
                if (isObject(values[key]) && typeof values[key] === 'string') {
                    values[key] = this.trim(values[key]);
                }
            }
        });
        return values;
    }

    transform(values: any, metadata: ArgumentMetadata): number {
        const { type } = metadata;

        // trim all properties type string.
        if (isObject(values) && type === 'body') {
            return this.trim(values);
        }

        return values;
    }
}
