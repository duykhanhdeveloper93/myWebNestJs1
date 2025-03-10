import {
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsRelations,
    QueryRunner,
    SaveOptions,
    SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Request, Response } from 'express';
import { UserEntity } from 'src/entities/01.user/user.entity';
import { Permission } from 'src/common/00.enum/permission.enum';

export interface CRequest extends Request {
    user: UserEntity & { pers: Permission[] };
}

export type CResponse = Response;

export type OmitSave<T> = Omit<T, 'deletedAt' | 'createdBy' | 'modifiedBy'>;

export interface GetAllResult<T> {
    items: T[];
    total: number;
}

export interface GetListResult<T> {
    items: T[];
}

export interface CFindManyOptions<T> extends FindManyOptions<T> {
    createBy: boolean;
    modifiedBy: boolean;
}

export interface IBaseService<T> {
    /**
     * Get information of current user who executing request
     */
    getCurrentUser(): UserEntity;
    /**
     * Get items and no limit items returned
     * @param query
     */
    getAll(query?: FindManyOptions<T>): Promise<GetAllResult<T>>;
    /**
     * Get and limit max items returned
     *
     * Max items - 50
     *
     * @param query
     */
    getMany(query?: FindManyOptions<T>): Promise<GetAllResult<T>>;

    exist(query?: FindManyOptions<T>): Promise<boolean>;

    getTotal(query?: FindManyOptions<T>): Promise<number>;
    /**
     * Get first enitity by Id. If entity was not found in the database - rejects with error.
     * @param id
     * @returns
     */
    getById(id: number): Promise<T>;
    /**
     * Get first entity by a id and can join with other tables with FindOptionsRelations of TypeORM.
     * @param id
     * @param expand Relations find options.
     * @returns a entity. If entity was not found in the database, return null
     */
    getByIdAndExpand(id: number, expand?: FindOptionsRelations<T>): Promise<T>;
    /**
     * Finds first entity by a given find options
     * @param id
     * @param options find one options of TypeORM.
     * @returns a entity. If entity was not found in the database, return null
     */
    getByIdWithOptions(id: number, options: FindOneOptions<T>): Promise<T>;
    /**
     * Create new entity
     * @param data
     * @param options
     */
    save(data: T, options?: SaveOptions): Promise<OmitSave<T>>;
    /**
     * Deletes entities by a given criteria.
     *
     * Executes fast and efficient DELETE query.
     * @param id
     */

    /**
     * Update a entity by id and return value of record.
     * @param id
     * @param data
     */
    update(id: number, data: QueryDeepPartialEntity<T>): Promise<T | null>;
    /**
     * Deletes entities by a given criteria.
     *
     * Executes fast and efficient DELETE query.
     * @param id
     */
    delete(id: number): Promise<DeleteResult>;
    /**
     * Records the delete date of entities by a given criteria.
     *
     * Executes fast and efficient SOFT-DELETE query.
     * @param id
     */
    softDelete(id: number): Promise<boolean>;
    /**
     * Create query builder to interact with database based on query runner.
     * @see https://typeorm.io/select-query-builder
     * @param queryRunner
     */
    createQueryBuilder(queryRunner: QueryRunner): SelectQueryBuilder<T>;
    /**
     * Only members of site or a user is SuperAdmin can access resources of site.
     * @param siteId
     * @returns
     */
}
