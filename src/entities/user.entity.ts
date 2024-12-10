import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CBaseEntity } from './base.entity';
import { UserRoleEntity } from './user_role.entity';

@Entity('user')
export class UserEntity extends CBaseEntity{

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  public userRoles: UserRoleEntity[];
}
