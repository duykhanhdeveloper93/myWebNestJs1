import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';

  import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, jwtConstants } from 'src/common/00.enum';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      
      console.log(context.getHandler())
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      console.log(isPublic)
      if (isPublic) {
        return true; // Cho phép truy cập mà không cần xác thực
      }
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const usr = request.headers['u-s-r'];
      const clientId = request.headers['client-id'];

      if (!token || !usr || !clientId) {
        throw new UnauthorizedException('Missing authentication headers');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request['user'] = payload;
        request['usr'] = usr;
        request['clientId'] = clientId;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }