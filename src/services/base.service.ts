import { Injectable } from '@nestjs/common';
import {
    DataSource,
    DeepPartial,
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsWhere,
    QueryRunner,
    SaveOptions,
} from 'typeorm';


import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CRequest, GetAllResult, GetListResult, IBaseService, OmitSave } from './base.service.type';
import { CBaseEntity } from 'src/entities/base.entity';
import { BaseRepository } from 'src/repositories/base.repository';
import { PAGE_SIZE, ResponseCodeEnum } from 'src/common/00.enum/consts';
import { eq, first, map, omit } from 'lodash';
import { UserEntity } from 'src/entities/user.entity';
import { UserIdentity } from './identity.service';
import { user } from 'src/common/00.enum/permission.enum';

@Injectable()
export abstract class BaseService<T extends CBaseEntity, R extends BaseRepository<T>> implements IBaseService<T> {
    /**
     * @param request
     * @param repository
     */
    constructor(private readonly request: CRequest, protected repository: R) {}

    canAccessSite(siteId: number) {
        if (!siteId) return false;
        const currentUser = this.getCurrentUser();
        // const isAdmin = currentUser.isAdmin;
        // const isMemberOfSite = eq(currentUser.site?.id, +siteId);
        // return isAdmin || isMemberOfSite;
        return true;
    }

    getCurrentUser(): UserEntity & {
      
        cId?: number;
    } {
        return this.request?.user  || user;
    }

    // isSuperAdmin() {
    //     const currentUser = this.getCurrentUser();
    //     const isAdmin = currentUser?.pers?.includes(Permission.SuperAdmin) || currentUser?.isSys;
    //     return !!isAdmin;
    // }

    // getCurrentSiteUser() {
    //     const currentUser = this.getCurrentUser();
    //     const { site } = currentUser;
    //     return site ? site : null;
    // }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.repository.softDelete(id);
        return !!result.affected;
    }

    async softRemove(entity: any): Promise<any> {
        return await this.repository.softRemove(entity);
    }

    async softDeleteMany(ids: number[]): Promise<boolean> {
        if (!ids.length) return false;
        const result = await this.repository.softDelete(ids);
        return !!result.affected;
    }

    async softDeleteByQuery(query: FindOptionsWhere<T>): Promise<boolean> {
        const result = await this.repository.softDelete(query);
        return !!result.affected;
    }
    async deleteByQuery(query: FindOptionsWhere<T>): Promise<boolean> {
        const result = await this.repository.delete(query);
        return !!result.affected;
    }

    getTotal(query?: FindManyOptions<T>): Promise<number> {
        return this.repository.count(query);
    }

    exist(query?: FindManyOptions<T>): Promise<boolean> {
        return this.repository.exists(query);
    }

    async getMany(query?: FindManyOptions<T>): Promise<GetAllResult<T>> {
        let top = PAGE_SIZE.MAX;
        if (query?.take && query.take <= PAGE_SIZE.MAX) {
            top = query.take;
        }
        const [items, total] = await this.repository.findAndCount({
            ...query,
            take: top,
        });
        return { items, total };
    }

    async getAll(query?: FindManyOptions<T>): Promise<GetAllResult<T>> {
        const [items, total] = await this.repository.findAndCount({
            ...query,
        });
        return { items, total };
    }

    async getList(query?: FindManyOptions<T>): Promise<GetListResult<T>> {
        const items = await this.repository.find({
            ...query,
        });
        return { items };
    }

    async getFirst(query?: FindManyOptions<T>): Promise<T> {
        const { items } = await this.getList({
            ...query,
            take: 1,
        });
        return first(items);
    }

    async getLast(query?: FindManyOptions<T>): Promise<T> {
        const items = await this.repository.find({
            ...query,
            take: 1,
            order: { createdAt: 'DESC' } as FindOptionsOrder<T>,
        });
        return first(items);
    }

    async getOneByQuery(query?: FindManyOptions<T>): Promise<T> {
        const item = await this.repository.findOne({
            ...query,
        });
        return item;
    }

    getById(id: number): Promise<T> {
        return this.repository.findOneBy({
            id,
        } as FindOptionsWhere<T>);
    }

    async getByIdAndExpand(id: number, expand?: FindOptionsRelations<T>): Promise<T> {
        const relations = {
            ...expand,
        };
        const record = await this.repository.findOne({
            where: {
                id,
            } as FindOptionsWhere<T>,
            relations,
        });
        return record;
    }

    async getByIdWithOptions(id: number, options: Exclude<FindOneOptions<T>, 'where'>): Promise<T> {
        const record = await this.repository.findOne({
            ...options,
            where: {
                id,
            } as FindOptionsWhere<T>,
        });
        return record;
    }

    async save(data: DeepPartial<T>, options?: SaveOptions): Promise<OmitSave<T>> {
        const currentUser = this.getCurrentUser();
        const createdBy = data.createdBy || currentUser;
        const modifiedBy = currentUser;
        try {
            const record = await this.repository.save(
                { ...data, createdBy, modifiedBy },
                { transaction: false, ...options },
            );
            const item = omit(record, ['deletedAt', 'createdBy', 'modifiedBy']);
            return item;
        } catch (error) {
            this.catchError(error);
        }
    }

    async saveMany(items: DeepPartial<T>[], options?: SaveOptions) {
        const currentUser = this.getCurrentUser();
        const results = map(items, (item) => {
            return {
                ...item,
                createdBy: item.createdBy || currentUser,
                modifiedBy: currentUser,
            };
        });
        try {
            const records = await this.repository.save(results, { transaction: false, ...options });
            return records;
        } catch (error) {
            this.catchError(error);
        }
    }

    async update(
        id: number | string,
        data: QueryDeepPartialEntity<T>,
        options?: { reload: boolean },
    ): Promise<T | null> {
        const currentUser = this.getCurrentUser();
        const reload = options?.reload || true;
        try {
            const record = await this.repository.update(id, {
                ...omit(data, 'id'),
                modifiedBy: currentUser,
            } as QueryDeepPartialEntity<T>);
            if (record) {
                if (!reload) return true as any;
                return this.repository.findOneBy({
                    id: id,
                } as FindOptionsWhere<T>);
            }
            // throw new CBadRequestException(ResponseCodeEnum.NOT_FOUND);
        } catch (error) {
            this.catchError(error);
        }
    }

    async updateMany(criteria: FindOptionsWhere<T>, item: any) {
        await this.repository.update(criteria, item);
    }

    async delete(criteria: any): Promise<DeleteResult> {
        const result = await this.repository.delete(criteria);
        return result;
    }

    async deleteMultipleById(ids: number[]): Promise<DeleteResult> {
        if (!ids.length) return null;
        return await this.repository.delete(ids);
    }
    async softDeleteMultipleById(ids: number[]): Promise<boolean> {
        if (!ids.length) return null;
        const result = await this.repository.softDelete(ids);
        return !!result.affected;
    }
    createQueryBuilder(queryRunner?: QueryRunner) {
        return this.repository.createQueryBuilder(this.repository.metadata.tableName, queryRunner);
    }

    public catchError(error: { code: ResponseCodeEnum }) {
        if (error?.code === ResponseCodeEnum.ER_DUP_ENTRY) {
            // throw new CBadRequestException(ResponseCodeEnum.ER_DUP_ENTRY);
        }
        throw error;
    }
    /**
     * Hàm restore các bản ghi đã bị xoá mềm
     * @param data
     * @returns
     */
    async restore(data: any) {
        return await this.repository.restore(data);
    }

    // acquirePer(...permissions: Permission[]) {
    //     const currentUser = this.getCurrentUser();
    //     if (!currentUser) {
    //         return false;
    //     }
    //     const c1 = currentUser.pers.find((per) => {
    //         return permissions.includes(per);
    //     });
    //     const c2 = currentUser.isSys;
    //     return !!c1 || c2;
    // }
}
