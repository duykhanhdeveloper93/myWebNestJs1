
import { PermissionEntity } from '../entities/02.permission/permission.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';


@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
    constructor(private dataSource: DataSource) {
        super(PermissionEntity, dataSource.createEntityManager());
    }

}
