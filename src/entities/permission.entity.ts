import { Entity, Column, ManyToMany, BaseEntity, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CBaseEntity } from './base.entity';
import { RolePermissionEntity } from './role-permission.entity';


@Entity({ name: 'permission' })
export class PermissionEntity extends CBaseEntity {
  @Column({ nullable: false, length: 255, type: 'varchar' , comment: 'Tên của quyền' })
  name: string

  @Column({ nullable: true, length: 255, type: 'varchar' , comment: 'Mô tả của quyền' })
  desc: string

  @OneToMany(() => RolePermissionEntity, (role) => role.permission,{
      createForeignKeyConstraints: false,
  })
  public rolePermissions!: RolePermissionEntity[]
}
