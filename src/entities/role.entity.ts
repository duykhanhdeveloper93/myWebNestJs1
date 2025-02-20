import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';
import { CBaseEntity } from './base.entity';
import { UserRoleEntity } from './user_role.entity';
import { RolePermissionEntity } from './role-permission.entity';

@Entity('role')
export class RoleEntity extends CBaseEntity{

  @Column({ nullable: false, length: 255, type: 'varchar' , comment: 'Tên của vai trò' })
  name: string

  @Column({ nullable: true, length: 255, type: 'varchar' , comment: 'Mô tả của vai trò' })
  desc: string

  @Column({ nullable: true, type: 'boolean' })
  default: boolean

  @OneToMany(() => RolePermissionEntity, (role) => role.role, {
      createForeignKeyConstraints: false,
  })
  public rolePermissions!: RolePermissionEntity[]

  @OneToMany(() => UserRoleEntity, (role) => role.role, {
      createForeignKeyConstraints: false,
  })
  
  public userRoles!: UserRoleEntity[];
}

