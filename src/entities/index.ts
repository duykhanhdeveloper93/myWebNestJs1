

import { PermissionEntity } from './permission.entity';
import { RolePermissionEntity } from './role-permission.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { UserRoleEntity } from './user_role.entity';

export { PermissionEntity } from './permission.entity';
export { RoleEntity } from './role.entity';
export { UserEntity } from './user.entity';



export const myWebApiEntities = [
   UserEntity,
   RoleEntity,
   PermissionEntity,
   UserRoleEntity,
   RolePermissionEntity
];
