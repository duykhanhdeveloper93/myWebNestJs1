import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { first } from 'lodash';
import { BaseService } from './base.service';
import { CRequest } from './base.service.type';
import { NJRS_REQUEST } from 'nj-request-scope';
import { REQUEST } from '@nestjs/core';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { CPaginateOptions, CPaginateResult } from './99.query-builder/query-builder.service';


export interface ICurrentUser {
  id: number;
  name: string;
  isSys?: number;
  loginName: string;
  clientId?: string;
}

export interface UserFindOptions extends CPaginateOptions<UserEntity> {
  keyword?: string;
  status?: number;
  department?: number[];
  site?: number;
  loginName?: string;
  fullName?: string;
  extension?: string;
  isSuperAdmin?: boolean;
}


@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(
    protected userRepository: UserRepository,
    private dataSource: DataSource,
    @Inject(REQUEST) request: CRequest,
  ) {
    super(request, userRepository);
  }

  async findAll() {
    return this.userRepository.find({ relations: ['roles', 'roles.permissions'] });
  }

  async createRootUser(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.findOne({
      where: { username: "russiaVictory" }
      
    });
    if (!exists) {
      const saltRounds = 10; // Độ phức tạp của mã hóa
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      const currentUser = this.getCurrentUser();
      createUserDto.createdAt = new Date();
      createUserDto.createdBy = currentUser;
      
      const user = this.userRepository.create(createUserDto);
      
      this.userRepository.save(user);
    }
    
  }

  async addNewUser(createUserDto: CreateUserDto) {
    const saltRounds = 10; // Độ phức tạp của mã hóa
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    console.log("xxxxxxxxx1")
    const currentUser = this.getCurrentUser();
    createUserDto.createdAt = new Date();
    createUserDto.createdBy = currentUser;
    const user : UserEntity = this.userRepository.create(createUserDto);
    console.log("xxxxxxxxx2" + user.username)
    console.log("xxxxxxxxx2" + user.firstName)
    return this.userRepository.save(user);
     
  }


  async create(createUserDto: CreateUserDto, currentUser: UserEntity) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }



  async findByUsername(username: string, options?: Omit<FindManyOptions<UserEntity>, 'where'>) {
    const users = await this.userRepository.find({
        ...options,
        select: {
            id: true,
            username: true,
            ...options.select,
        },
        where: {
          username,
        },
    });
    return first(users);
}



  async findRolesByUser(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions']
    });
  }

  async findOne(username: string) {
    return this.userRepository.findOne({
      where: { username: username }
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust this value based on your security needs
    return await bcrypt.hash(password, saltRounds);
  }


  async getByUserNameMinify(userName: string, where?: FindOptionsWhere<UserEntity>) {
    const users = await this.repository.find({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            passwordHash:true,
            passwordHashTemp: true,
            status:true
        },
        where: {
            ...where,
            username: userName,
           
        }
       
    });
    const user = first(users);
    return user;
}

  async findAllPaginated(options: UserFindOptions): Promise<CPaginateResult<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
        // Kết hợp bảng userRole
    queryBuilder.leftJoinAndSelect('user.userRoles', 'role');

      

    // Apply filters
    if (options.keyword) {
      queryBuilder.where(
        '(user.loginName LIKE :keyword OR user.fullName LIKE :keyword)',
        { keyword: `%${options.keyword}%` }
      );
    }

    if (options.status !== undefined) {
      queryBuilder.andWhere('user.status = :status', { status: options.status });
    }

    if (options.department?.length) {
      queryBuilder.andWhere('user.departmentId IN (:...departments)', { 
        departments: options.department 
      });
    }

    if (options.site !== undefined) {
      queryBuilder.andWhere('user.siteId = :site', { site: options.site });
    }

    if (options.loginName) {
      queryBuilder.andWhere('user.loginName LIKE :loginName', { 
        loginName: `%${options.loginName}%` 
      });
    }

    if (options.fullName) {
      queryBuilder.andWhere('user.fullName LIKE :fullName', { 
        fullName: `%${options.fullName}%` 
      });
    }

    if (options.extension) {
      queryBuilder.andWhere('user.extension LIKE :extension', { 
        extension: `%${options.extension}%` 
      });
    }

    if (options.isSuperAdmin !== undefined) {
      queryBuilder.andWhere('user.isSuperAdmin = :isSuperAdmin', { 
        isSuperAdmin: options.isSuperAdmin 
      });
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