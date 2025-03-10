import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository';
import { UserRoleEntity } from '../entities/04.user-role/user_role.entity';
import { DataSource } from 'typeorm';






@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserRoleEntity, dataSource.createEntityManager());
    }
}