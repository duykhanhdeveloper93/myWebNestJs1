import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';


export * from './role.service';
export * from './user.service';
export * from './permission.service';


export const coreServices = [
    UserService,
    RoleService,
    PermissionService
];
