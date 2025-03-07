

import { BaseRepository } from './base.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';
import { PermissionRepository } from './permission.repository';
import { RolePermissionRepository } from './role-permission.repository';
import { ArticleRepository } from './article.repository';


export * from './base.repository';
export * from './role.repository';
export * from './user.repository';
export * from './permission.repository';


export const myWebApiRepositories = [
   RoleRepository,
   UserRepository,
   PermissionRepository,
   BaseRepository,
   RolePermissionRepository,
   UserRepository,
   ArticleRepository

];
