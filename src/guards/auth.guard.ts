import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { HeadersKeyEnum, IS_PUBLIC_KEY, jwtConstants, redisConsts, ResponseCodeEnum } from 'src/common/00.enum';
import { CRequest } from 'src/services/base.service.type';
import { RCacheManager } from '../services';
import { environment } from '../common/02.environment';
import { IdentityService } from 'src/services/identity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // private readonly logger = new CLogger('CurrentUser');
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private cacheManager: RCacheManager,
    private identityService: IdentityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<CRequest>() as CRequest;

    if (isPublic) {
        return true;
    }
    const isValid = await this.canActiveWithInternal(request);
    return isValid;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // console.log('Authorization Header:', request.headers); // Kiểm tra header
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  /**
   * Áp dụng cho các service gọi nội bộ sử dụng access_token và refresh_token.
   * @param accessToken
   * @param request
   * @returns
   */
  async canActiveWithInternal(request: CRequest) {
    this.extractTokenFromHeader(request);
    const accessToken = this.extractToken(request);
    console.log("accessToken: ===>" + accessToken)
    try {
      if (!accessToken) {
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
      }
      const refreshToken = (await this.cacheManager.get(
        `${redisConsts.prefixRefreshToken}:${request.headers[HeadersKeyEnum.ClientId]}`,
      )) as string;
      if (accessToken && !refreshToken) {
        console.log("accessToken"+ accessToken)
        console.log("refreshToken"+ refreshToken)
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
      }
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: environment.jwtSecretATKey,
      });
      const currentUser = await this.identityService.aggreate(payload.id);
      console.log("currentUser: ===>" + currentUser)
      if (!currentUser) {
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);      }
      request.user = currentUser;
     
      return true;
    } catch (error) {
     
      this.catchError(error);
    }
  }

  private extractToken(request: CRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private catchError(error) {
    if (error?.name === 'TokenExpiredError') {
        throw new UnauthorizedException(ResponseCodeEnum.TOKEN_EXPIRED);
    }

    if (error?.name === 'JsonWebTokenError' && error?.message === 'invalid signature') {
        throw new UnauthorizedException(ResponseCodeEnum.INVALID_TOKEN);
    }

    if (error?.status === HttpStatus.FORBIDDEN) {
        throw new ForbiddenException();
    }

    throw error;
}

}
