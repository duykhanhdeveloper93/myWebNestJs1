import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import {
  ResponseCodeEnum,
  jwtConstants,
  redisConsts,
} from 'src/common/00.enum/consts';
import { CRequest } from './base.service.type';
import { HeadersKeyEnum } from 'src/common/00.enum/header.enum';
import { CIncomingHttpHeaders } from 'src/common/04.types/http-request';
import { TokenService } from './token.service';
import { RCacheManager } from './CacheManager';
import { CrytoService } from './cryto.service';
import { isNull } from 'util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private cacheManager: RCacheManager,
    private crytoService: CrytoService
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async signIn(
    singInRequest: { userName: string; password: string; captcha: string },
    options: { request: CRequest },
) {
    const { captcha, password, userName } = singInRequest;
    //#region check user logged-in
    const isLoggedIn = await this.tokenService.loggedIn(options.request);
    if (isLoggedIn) {
        throw new BadRequestException(ResponseCodeEnum.LOGGED_IN);
    }
    //#endregion

    //#region check username, status.
    const user = await this.userService.getByUserNameMinify(userName);
    if (!user || user?.isExternalUser) {
        throw new BadRequestException(ResponseCodeEnum.NOT_EXIST_USER);
    }
    if (user && user?.id && user?.status === false) {
        throw new BadRequestException(ResponseCodeEnum.USER_DEACTIVE);
    }
    if (!user.status) throw new BadRequestException(ResponseCodeEnum.NOT_PERMISION_LOGIN);
    //#endregion

    //#region check captcha
    const captchaId = options.request.cookies[HeadersKeyEnum.CaptchaId];
    const captchaValue = await this.cacheManager.get(`${redisConsts.prefixCaptchaToken}:${captchaId}`);
    if (!captchaValue) {
        throw new BadRequestException(ResponseCodeEnum.CAPTCHA_EXPIRED);
    }
    if (captchaValue !== captcha) {
        throw new BadRequestException(ResponseCodeEnum.INVALID_CAPTCHA);
    }
    //#endregion

    //#region compare password
    if (!isNull(user.passwordHashTemp) && (await this.crytoService.compare(password, user.passwordHashTemp))) {
        // Nếu password nhập vào bằng passwordHashTemp thì tức là lần đăng nhập đầu tiên sau khi đổi mật khẩu.
        // Tiến hành update lại mật khẩu mới bằng mật khẩu temp và reset trường mật khẩu temp
        
    } else if (!(await this.crytoService.compare(password, user.passwordHash))) {
        throw new BadRequestException(ResponseCodeEnum.U_PW_NOT_CORRECT);
    }
    //#endregion

    //#region generate token
    const payload = {
        id: user.id,
        name: user.name,
        loginName: user.loginName,
    };
    const token = this.tokenService.generateKey(payload);
    //#endregion

    //#region clean up
    await this.cacheManager.deleteKeys(`${redisConsts.prefixCaptchaToken}:${captchaId}`);
    //#endregion

    return { token, userId: user.id };
}


  // async signIn(
  //   username: string,
  //   pass: string,
  //   options: { request: CRequest },
  // ): Promise<any> {
  //   const isLoggedIn = await this.tokenService.loggedIn(options.request);
    
  //   if (isLoggedIn) {
  //     console.log("trong phiên")
  //     return {
  //       message: 'Đang trong phiên đăng nhập',
  //     };
  //   }

  //   //#region check username, status.
  //   const user = await this.userService.findByUsername(username, {
  //     select: {
  //       id: true,
  //       username: true,
  //       password: true,
  //     },
  //     take: 1,
  //   });
  //   if (!user) {
  //     throw new BadRequestException(ResponseCodeEnum.NOT_EXIST_USER);
  //   }
  //   const isPasswordMatching = await bcrypt.compare(pass, user.password);
  //   // const passHash = await this.userService.hashPassword(pass);
  //   if (!isPasswordMatching) {
  //     return {
  //       message: 'Mật khẩu hoặc username không đúng',
  //     };
  //   } else {
  //     try {

        

  //       const payloadGenKey = {
  //         id: user.id,
  //         name: user.name,
  //         username: user.username,
  //       };
  //       const token = await this.tokenService.generateKey(payloadGenKey);
  //       return { token : token, userId: user.id };
  //     } catch (error) {
  //       //
  //     }
  //   }
  // }

  

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async signOut(userId: number, options: { extension?: string; changeBy: 'user' | 'system' }) {
    await this.clearSessionOfUser(`${userId}`);
    return true;
  }

      // Only logout now
  async clearSessionOfUser(user_id: string) {
    //#region xóa session hiện có của user tương ứng.
    await this.cacheManager.deleteKeys(`${redisConsts.prefixRefreshToken}:${user_id}:*`);
    //#endregion
    //#region invalid cache
    await this.cacheManager.deleteKeys(`${redisConsts.prefixUserIdentity}:${user_id}`);
    //#endregion
  }

}
