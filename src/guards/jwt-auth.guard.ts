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
   
    console.log(context.getHandler());
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true; // Cho phép truy cập mà không cần xác thực
    }
    
    const request = context.switchToHttp().getRequest();
    console.log("2.2 request" + request);
    const token = this.extractTokenFromHeader(request);
    const usr = request.headers['u-s-r'];
    const clientId = request.headers['client-id'];
    console.log("2.2 token" + token);
    console.log("2.2 usr" + usr);
    console.log("2.2 clientId" + clientId);
   
    if (!token || !usr || !clientId) {
      console.log("2.2");
      throw new UnauthorizedException('Missing authentication headers');
      
    }
    try {
      console.log("2.3");
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log("3");
      request['user'] = payload;
      request['usr'] = usr;
      request['clientId'] = clientId;
      const isValid = await this.canActiveWithInternal(request);
      return isValid;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log("request.headers" + request.headers);
    console.log("request.headers.authorization" + request.headers.authorization);
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * Áp dụng cho các service gọi nội bộ sử dụng access_token và refresh_token.
   * @param accessToken
   * @param request
   * @returns
   */
  async canActiveWithInternal(request: CRequest) {
    console.log("Lấy current User mà bỏ vào request")
    const accessToken = this.extractToken(request);
    
    try {
      if (!accessToken) {
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
      }
      const refreshToken = (await this.cacheManager.get(
        `${redisConsts.prefixRefreshToken}:${request.headers[HeadersKeyEnum.ClientId]}`,
      )) as string;
      if (accessToken && !refreshToken) {
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
      }
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: environment.jwtSecretATKey,
      });
      console.log("Lấy current User mà bỏ vào request")
      const currentUser = await this.identityService.aggreate(payload.id);
      if (!currentUser) {
        throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
      }
      request.user = currentUser;
      console.log('currentUser như nào hả');
      // this.logger.logAuthor(currentUser.id);
      return true;
    } catch (error) {
      // this.logger.error('[AuthInternalError]', error);
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
