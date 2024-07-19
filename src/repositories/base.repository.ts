import { Injectable } from '@nestjs/common';
import { PAGE_SIZE } from 'src/common/00.enum/consts';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
    /**
     * Phân trang common
     * @param query
     * @param options
     * @returns
     */
    async getPaging(
        query: SelectQueryBuilder<T>,
        options: { skip?: number; top?: number; order?: any },
    ): Promise<[T[], number]> {
        const skip = options?.skip || 0;
        const take = options?.top || PAGE_SIZE.MIN;
        if (options.order) {
            query.orderBy(options.order);
        }
        return await query.skip(skip).take(take).getManyAndCount();
    }
}
