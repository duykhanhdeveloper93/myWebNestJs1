

import { ArticleEntity } from './06.article/article.entity';
import { PermissionEntity } from './03.permission/permission.entity';
import { RolePermissionEntity } from './05.role-permission/role-permission.entity';
import { RoleEntity } from './02.role/role.entity';
import { UserEntity } from './01.user/user.entity';
import { UserRoleEntity } from './04.user-role/user-role.entity';


export { RoleEntity } from './02.role/role.entity';
export { UserEntity } from './01.user/user.entity';
export { ArticleEntity } from './06.article/article.entity';
export { PermissionEntity } from './03.permission/permission.entity';

export const myWebApiEntities = [
   UserEntity,
   RoleEntity,
   ArticleEntity,
   PermissionEntity,
   UserRoleEntity,
   RolePermissionEntity,

];
