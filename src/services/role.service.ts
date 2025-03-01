import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { RoleEntity } from 'src/entities';
import { CPaginateOptions, CPaginateResult } from './99.query-builder/query-builder.service';


export interface RoleFindOptions extends CPaginateOptions<RoleEntity> {
  keyword?: string;
 
}


@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

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
          '(user.loginName LIKE :keyword OR user.fullName LIKE :keyword)',
          { keyword: `%${options.keyword}%` }
        );
      }
  
      
      // Apply sorting
      if (options.sortBy) {
        queryBuilder.orderBy(`user.${options.sortBy}`, options.sortOrder || 'ASC');
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
