import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository';
import { UserRoleEntity } from '../entities/04.user-role/user_role.entity';



@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {}
