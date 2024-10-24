import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleService } from 'src/services/role.service';
import { PermissionEnum } from 'src/common/00.enum/permission.enum';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleService: RoleService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<PermissionEnum[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
        return true; // Không cần kiểm tra permission
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Giả sử bạn đã đính kèm thông tin người dùng vào request

    const hasPermission = () => requiredPermissions.some((permission) => user.permissions.includes(permission));
    if (!hasPermission()) {
        throw new ForbiddenException('Bạn không có quyền truy cập vào tài nguyên này.');
    }
    return true;
}
}
