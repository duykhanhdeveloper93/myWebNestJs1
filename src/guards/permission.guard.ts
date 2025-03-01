import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PER_KEY } from 'src/decorators/permission.decorator';
import { CRequest } from 'src/services/base.service.type';
import { Permission } from 'src/common/00.enum/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        console.log("check Permission Guard 1")
        const requiredPers = this.reflector.getAllAndOverride<Permission[]>(PER_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log("check Permission Guard 2")
        if (!requiredPers) {
            return true;
        }

        const {
            user: { pers, isSys },
        } = context.switchToHttp().getRequest<CRequest>();

        let canAccess = !!pers.find((per) => {
            return requiredPers.includes(per);
        });
        
        if (isSys) {
            console.log("Tao là isAdmin")
            canAccess = true;
        }

        if (!canAccess) throw new ForbiddenException('Bạn không có quyền truy cập vào tài nguyên này!');
        return canAccess;
    }
}
