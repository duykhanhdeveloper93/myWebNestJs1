import { RCacheManager } from './CacheManager';
import { AuthService } from './auth.service';

import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { StartUpService } from './startup.service';
import { IdentityService } from './identity.service';
import { CrytoService } from './cryto.service';
import { ArticleService } from './article.service';



export * from './role.service';
export * from './base.service';
export * from './user.service';
export * from './startup.service';
export * from './permission.service';
export * from './auth.service';
export * from './CacheManager';
export * from './cryto.service';



export const coreServices = [
    UserService,
    RoleService,
    PermissionService,
    AuthService,
    TokenService,
    RCacheManager,
    StartUpService,
    IdentityService,
    CrytoService,
    ArticleService

];
