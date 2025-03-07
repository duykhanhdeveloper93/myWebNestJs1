import { ApiProperty } from '@nestjs/swagger';
import { forEach } from 'lodash';
import {
    Between,
    Equal,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    ILike,
    IsNull,
    Like,
    MoreThan,
    Not,
} from 'typeorm';

export type FindManyResult<T> = { items: T[]; total: number };

export class CPaginateOptions<T> {
    @ApiProperty()
    top: number;
    @ApiProperty()
    skip: number;
    @ApiProperty({ required: false, example: { createdAt: 'DESC' } })
    order?: FindOptionsOrder<T>;
}

type MappingGetAllOptionsFilter<T> = Partial<{
    [Property in keyof T]: GetAllOptionsFilter;
}>;

type GetAllOptionsFilter = GetAllOptionsFilterNormal | GetAllOptionsFilterBetween;

interface GetAllOptionsNegative {
    negative?: boolean;
}
interface GetAllOptionsFilterNormal extends GetAllOptionsNegative {
    type:
        | 'Not'
        | 'LessThan'
        | 'LessThanOrEqual'
        | 'MoreThan'
        | 'MoreThanOrEqual'
        | 'Equal'
        | 'Like'
        | 'ILike'
        | 'In'
        | 'Any'
        | 'IsNull';
    value?: string | number | boolean | string[] | number[];
}

interface GetAllOptionsFilterBetween extends GetAllOptionsNegative {
    type: 'Between';
    to: number;
    from: number;
}

export interface GetAllOptions<T> {
    take: number;
    skip: number;
    select: FindOptionsSelect<T>;
    relations: FindOptionsRelations<T>;
    where: MappingGetAllOptionsFilter<T>;
    order: FindOptionsOrder<T>;
}

export class QueryBuilder<T> {
    private options: FindManyOptions<T> = {};

    take(item: number) {
        this.options.take = item;
        return this;
    }

    skip(item: number) {
        this.options.skip = item;
        return this;
    }

    select(fields: FindOptionsSelect<T>) {
        this.options.select = fields;
        return this;
    }

    orderBy(options: FindOptionsOrder<T>) {
        this.options.order = {
            ...options,
        };
        return this;
    }

    where(items: MappingGetAllOptionsFilter<T> | MappingGetAllOptionsFilter<T>[]) {
        const filters: FindOptionsWhere<T> = {};

        forEach(Object.keys(items), (p) => {
            const criteria = p as string;
            const type = items[p]?.type;
            const negotive = items[p]?.negotive;
            const value = items[p]?.value;
            const to = items[p]?.to;
            const from = items[p]?.from;

            switch (type) {
                case 'Equal':
                    filters[criteria] = negotive ? Not(Equal(value)) : Equal(value);
                    break;

                case 'Like':
                    filters[criteria] = negotive ? Not(Like(value)) : Like(value);
                    break;

                case 'ILike':
                    filters[criteria] = negotive ? ILike(value) : Equal(value);
                    break;

                case 'MoreThan':
                    filters[criteria] = negotive ? Not(MoreThan(value)) : MoreThan(value);
                    break;

                case 'Between':
                    filters[criteria] = negotive ? Not(Between(to, from)) : Between(to, from);
                    break;

                case 'IsNull':
                    filters[criteria] = negotive ? Not(IsNull()) : IsNull();
                    break;
                default:
                    break;
            }
        });

        this.options.where = filters;

        return this;
    }

    build() {
        return this.options;
    }
}
