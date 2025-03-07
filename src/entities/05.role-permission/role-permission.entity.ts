import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { CBaseEntity } from '../base.entity';

import { RoleEntity } from '../03.role/role.entity';
import { PermissionEntity } from '../02.permission/permission.entity';

@Entity({ name: 'role_permission' })
@Index(['roleId', 'permissionId', 'siteId'])
@Index(['roleId'])
export class RolePermissionEntity extends CBaseEntity {
    
    @Column({ comment: 'Id của vai trò' })
    public roleId: number;

    @Column({ comment: 'Id của quyền' })
    public permissionId: number;

    @Column({ comment: 'Id của site' })
    public siteId: number;



    @ManyToOne(() => RoleEntity, (role) => role.rolePermissions, {
        createForeignKeyConstraints: false,
    })
    public role: RoleEntity;

    @ManyToOne(
        () => PermissionEntity,
        (permission) => permission.rolePermissions,
        {
            createForeignKeyConstraints: false,
        },
    )
    public permission: PermissionEntity;
}
