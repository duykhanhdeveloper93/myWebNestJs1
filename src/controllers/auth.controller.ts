import { Controller, Post, Body, Req, UseGuards,HttpCode ,HttpStatus, Get,Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from 'src/guards/jwt-auth.guard';
import { LoginDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
