import { Controller, Get, Post, Body, Param, Request, ParseIntPipe, UseGuards, Query  } from '@nestjs/common';
import { UserFindOptions, UserService } from '../services/user.service';
import { CreateUserDto, createUserValidation } from 'src/dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

import { JoiValidationPipe } from 'src/pipe/joi.validation';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { Permission } from 'src/common/00.enum/permission.enum';
import { PermissionDecorators } from 'src/decorators';


import { ApiOperation } from '@nestjs/swagger';




@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async findAll() {
    const a: number = 1;
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
      
      return {aaa:"22222222"};
  }

  @PermissionDecorators(Permission.CreateUser)
  @Post('/createUser')
  async createUser(@Body(new JoiValidationPipe(createUserValidation)) item: CreateUserDto) {
      try {
        const newUser = await this.userService.addNewUser(item);
        return newUser;
      } catch (error) {
        throw new CBadRequestException('Lỗi hệ thống');
      }
     
      
  }
  
  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách user có phân trang và filter' })
  async getUsers(@Query() options: UserFindOptions) {
    return await this.userService.findAllPaginated(options);
  }

}

