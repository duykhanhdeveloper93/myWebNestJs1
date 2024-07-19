import { Entity, Column, ManyToMany, BaseEntity } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CBaseEntity } from './base.entity';


@Entity()
export class PermissionEntity extends CBaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[];
}
