import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
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

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'roles.permissions']
    });
  }

  async findRolesByUser(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions']
    });
  }

  // Thêm các method khác nếu cần
}
