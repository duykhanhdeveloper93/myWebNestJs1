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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private cacheManager: RCacheManager,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(
    username: string,
    pass: string,
    options: { request: CRequest },
  ): Promise<any> {
    const isLoggedIn = await this.tokenService.loggedIn(options.request);
    console.log("isLoggedIn: " + isLoggedIn)
    if (isLoggedIn) {
      return {
        message: 'Đang trong phiên đăng nhập',
      };
    }

    //#region check username, status.
    const user = await this.userService.findByUsername(username, {
      select: {
        id: true,
        username: true,
        password: true,
      },
      take: 1,
    });

    if (!user) {
      throw new BadRequestException(ResponseCodeEnum.NOT_EXIST_USER);
    }
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    // const passHash = await this.userService.hashPassword(pass);
    if (!isPasswordMatching) {
      return {
        message: 'Mật khẩu hoặc username không đúng',
      };
    } else {
      try {
        console.log("vào đây: " + 1)
        // Xóa session hiện có của user tương ứng.
        await this.cacheManager.deleteKeys(
          `${redisConsts.prefixRefreshToken}:${user.id}*`,
        );

        const payloadGenKey = {
          id: user.id,
          name: user.name,
          username: user.username,
        };
        const token = await this.tokenService.generateKey(payloadGenKey);
        return { token : token, userId: user.id };
      } catch (error) {
        //
      }
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
