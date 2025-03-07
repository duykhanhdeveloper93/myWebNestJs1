import { Inject, Injectable } from '@nestjs/common';


import { PermissionRepository } from '../repositories/permission.repository';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';

import { CPaginateOptions } from './99.query-builder/query-builder.service';
import { RoleRepository } from 'src/repositories/role.repository';
import { RoleEntity } from 'src/entities/03.role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CRequest } from './base.service.type';
import { REQUEST } from '@nestjs/core';
import { BaseService } from './base.service';


export interface RoleFindOptions extends CPaginateOptions<RoleEntity> {
  keyword?: string;
 
}


@Injectable()
export class  RoleService extends BaseService<RoleEntity, RoleRepository> {
  constructor(
      @Inject(REQUEST) request: CRequest,
      @InjectRepository(RoleEntity) repository: RoleRepository,
      private readonly roleRepository: RoleRepository,
  ) {
      super(request, repository);
  }


  async create(createRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }


  async search(options: RoleFindOptions) {
    const [items, count] = await this.roleRepository.search(options);
    return { items: items, count: count };
  }


}
