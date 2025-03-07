

import { UserEntity } from './01.user/user.entity';
import { UserRoleEntity } from './04.user-role/user_role.entity';
import { RoleEntity } from './03.role/role.entity';
import { PermissionEntity } from './02.permission/permission.entity';
import { RolePermissionEntity } from './05.role-permission/role-permission.entity';
import { ArticleEntity } from './06.article/article.entity';

export { PermissionEntity } from './02.permission/permission.entity';
export { UserEntity } from './01.user/user.entity';



export const myWebApiEntities = [
   UserEntity,
   RoleEntity,
   UserRoleEntity,
   PermissionEntity,
   RolePermissionEntity,
   ArticleEntity
];
