import { Controller, Get, Post, Body, Param, UseGuards,Request  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { PermissionEnum } from 'src/common/00.enum/permission.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(PermissionEnum.ManageUser)
  findAll() {
    return this.userService.findAll();
  }

  async create(@Body() createUserDto: CreateUserDto, @Request() req: { user: UserEntity }) {
    return this.userService.create(createUserDto, req.user);
  }

  // Các API khác
}
