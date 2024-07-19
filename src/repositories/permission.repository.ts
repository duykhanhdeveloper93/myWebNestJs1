
import { PermissionEntity } from '../entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> { }
