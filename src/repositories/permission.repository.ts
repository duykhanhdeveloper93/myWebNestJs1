
import { PermissionEntity } from '../entities/03.permission/permission.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> { }
