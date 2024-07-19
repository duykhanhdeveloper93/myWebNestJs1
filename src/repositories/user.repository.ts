
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> { }
