import { Controller, Get, Post, Body, Param, Request, ParseIntPipe, UseGuards  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, createUserValidation } from 'src/dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { PermissionEnum } from 'src/common/00.enum/permission.enum';
import { Permission } from '../decorators/permission.decorator'
import { JoiValidationPipe } from 'src/pipe/joi.validation';
import { CBadRequestException } from 'src/exception/badrequest.exception';

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

  //@Permission(PermissionEnum.ManageUser) // Chỉ cho phép người dùng có permission ManageUser truy cập
  @Post('/createUser')
  @UseGuards(AuthGuard)
  async createUser(@Body(new JoiValidationPipe(createUserValidation)) item: CreateUserDto) {
      try {
        const newUser = await this.userService.addNewUser(item);
        return newUser;
      } catch (error) {
        throw new CBadRequestException('Lỗi hệ thống');
      }
     
      
  }


}

