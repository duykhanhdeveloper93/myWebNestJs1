import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleService } from 'src/services/role.service';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const roles = await this.roleService.findRolesByUser(user.id);
    return roles.some(role =>
      requiredPermissions.every(permission =>
        role.permissions.map(p => p.name).includes(permission)
      )
    );
  }
}
