
import { Brackets, DataSource } from 'typeorm';
import { UserEntity } from '../entities/01.user/user.entity';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { UserFindOptions } from 'src/services';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { UserRoleEntity } from 'src/entities/04.user-role/user_role.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async search(options: UserFindOptions) {
        const query = this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .leftJoin(UserRoleEntity, 'ur', 'ur.userId = user.id')
        
        if (options?.keyword) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('(TRIM(role.name) LIKE :text)', { text: '%' + options.keyword + '%' }) 
                }),
            );
        }
        console.log(options)
        const result = await query
            .skip(options?.skip || 0)
            .take(options?.top || PageSizeEnum.SMALL)
            .orderBy('user.createdAt', 'DESC')
            .getManyAndCount();

            return result;
    }
    
 }
