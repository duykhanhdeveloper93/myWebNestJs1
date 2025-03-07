import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { RoleEntity } from 'src/entities';
import { CPaginateOptions, CPaginateResult } from './99.query-builder/query-builder.service';
import { BaseService } from './base.service';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { CRequest } from './base.service.type';


export interface RoleFindOptions extends CPaginateOptions<RoleEntity> {
  keyword?: string;
 
}


@Injectable()
export class RoleService extends BaseService<RoleEntity, RoleRepository> {
  constructor(
    protected roleRepository: RoleRepository,
    private dataSource: DataSource,
    @Inject(REQUEST) request: CRequest,
  ) {
    super(request, roleRepository);
  }

  async findAll() {
    return this.roleRepository.find({ relations: ['permissions', 'users'] });
  }

  async create(createRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }


  async findAllPaginated(options: RoleFindOptions): Promise<CPaginateResult<RoleEntity>> {
      const queryBuilder = this.roleRepository.createQueryBuilder('role');
          // Kết hợp bảng userRole

  
      // Apply filters
      if (options.keyword) {
        queryBuilder.where(
          '(role.name LIKE :keyword OR role.name LIKE :keyword)',
          { keyword: `%${options.keyword}%` }
        );
      }
  
      
      // Apply sorting
      if (options.sortBy) {
        queryBuilder.orderBy(`role.${options.sortBy}`, options.sortOrder || 'ASC');
      }
  
      // Apply pagination
      const page = options.page || 1;
      const limit = options.limit || PageSizeEnum.SMALL;
      const skip = (page - 1) * limit;
  
      queryBuilder.skip(skip).take(limit);
  
      // Execute query
      const [items, total] = await queryBuilder.getManyAndCount();
      console.log("item: " +items)
      console.log("Items: ", JSON.stringify(items, null, 2));
      return {
        items,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          
        }
      };
    }

  // Thêm các method khác nếu cần
}
