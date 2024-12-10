import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { LoginDto } from 'src/dtos/auth.dto';
import { CRequest } from 'src/services/base.service.type';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: LoginDto, @Req() req: CRequest) {
    const { token, userId } = await this.authService.signIn(signInDto.username, signInDto.password, { request: req});
    try {
      
      return { statusCode: HttpStatus.OK, data: token };
    } catch (error) {
      return error;
    }
   
  }

  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/sign-out')
  @ApiOperation({ summary: 'Sign out and remove session of current user' })
  async signOut(@User() currentUser: UserEntity) {
      console.log(currentUser)
      const userId = currentUser.id;
      await this.authService.signOut(userId, {
          changeBy: 'user',
      });
      return {
          message: 'logged-out',
      };
  }

}
