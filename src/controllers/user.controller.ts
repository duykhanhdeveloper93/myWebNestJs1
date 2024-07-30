import { Controller, Get, Post, Body, Param, Request, ParseIntPipe, UseGuards  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

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

  

  // Các API khác

}

