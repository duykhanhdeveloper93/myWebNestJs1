import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginDto } from 'src/dtos/auth.dto';
import { CRequest } from 'src/services/base.service.type';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { Public } from 'src/decorators/public.decorator';
import { PermissionDecorators } from 'src/decorators';
import { Permission } from 'src/common/00.enum/permission.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }




    //   @HttpCode(HttpStatus.OK)
    //   @UseGuards(AuthGuard)
    //   @Public()
    //   @Post('login')
    //   async signIn(@Body() signInDto: { userName: string; password: string; captcha: string }, @Req() req: CRequest) {
    //       const { token, userId } = await this.authService.signIn(signInDto, {
    //           request: req,
    //       });
    //       try {

    //       } catch (error) {

    //       }
    //       return token;
    //   }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async signIn(@Body() signInDto: { userName: string; password: string }, @Req() req: CRequest) {
        const { token, userId } = await this.authService.signInNoCaptcha(signInDto, {
            request: req,
        });

        return {
            statusCode: HttpStatus.OK,
            data: token
        };

    }



    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @PermissionDecorators(Permission.ManageUser) 
    @Post('/sign-out')
    @ApiOperation({ summary: 'Sign out and remove session of current user' })
    async signOut(@User() currentUser: UserEntity) {
        const userId = currentUser.id;
        await this.authService.signOut(userId, {
            changeBy: 'user',
        });
        return {
            statusCode: HttpStatus.OK,
            message: 'logged-out',
        };
    }

}
