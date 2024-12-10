import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository';
import { UserRoleEntity } from '../entities/user_role.entity';



@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {}
