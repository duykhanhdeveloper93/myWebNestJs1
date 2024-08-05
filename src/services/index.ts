import { RCacheManager } from './CacheManager';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';


export * from './role.service';
export * from './user.service';
export * from './permission.service';
export * from './auth.service';
export * from './CacheManager';


export const coreServices = [
    UserService,
    RoleService,
    PermissionService,
    AuthService,
    TokenService,
    RCacheManager
];
