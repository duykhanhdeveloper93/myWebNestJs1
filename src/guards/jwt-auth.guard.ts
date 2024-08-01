import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../common/00.enum/consts'
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const usr = request.headers['u-s-r'];
      const clientId = request.headers['client-id'];

      console.log(token);
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