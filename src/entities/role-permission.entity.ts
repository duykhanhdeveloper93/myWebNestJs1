import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from './permission.entity';
import { CBaseEntity } from './base.entity';


@Entity({ name: 'role_permission' })
@Index(['roleId', 'permissionId'])
@Index(['roleId'])
export class RolePermissionEntity extends CBaseEntity {
    
    @Column({ comment: 'Id của vai trò' })
    public roleId: number;

    @Column({ comment: 'Id của quyền' })
    public permissionId: number;


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
