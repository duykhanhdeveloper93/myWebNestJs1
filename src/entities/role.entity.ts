import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';
import { CBaseEntity } from './base.entity';

@Entity()
export class RoleEntity extends CBaseEntity{

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, permission => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
  })
  permissions: PermissionEntity[];
}
