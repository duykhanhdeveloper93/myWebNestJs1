import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource, FindManyOptions } from 'typeorm';
import { first } from 'lodash';
import { BaseService } from './base.service';
import { CRequest } from './base.service.type';
import { NJRS_REQUEST } from 'nj-request-scope';
import { REQUEST } from '@nestjs/core';




@Injectable()
export class StartUpService  {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}

  async findAll() {
    return this.userRepository.find({ relations: ['roles', 'roles.permissions'] });
  }

  async createRootUser(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.findOne({
      where: { username: "russiaVictory" }
      
    });
    if (!exists) {
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const user = this.userRepository.create(createUserDto);
      this.userRepository.save(user);
    }
    
  }

  async create(createUserDto: CreateUserDto, currentUser: UserEntity) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>, modifiedBy: string) {
    const user = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
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

  // Thêm các method khác nếu cần
}
