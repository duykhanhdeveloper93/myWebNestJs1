import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from '../02.role/role.entity';
import { CBaseEntity } from '../base.entity';
import { UserEntity } from '../01.user/user.entity';

@Entity({ name: 'user_role' })
export class UserRoleEntity extends CBaseEntity{

  @Column({ comment: 'Id của role' })
  public roleId: number;

  @Column({ comment: 'Id của user' })
  public userId: number;




  @ManyToOne(() => RoleEntity, (role) => role.userRoles, {
      createForeignKeyConstraints: false,
  })
  public role: RoleEntity;

  @ManyToOne(() => UserEntity, (user) => user.userRoles, {
      createForeignKeyConstraints: false,
  })
  public user: UserEntity;

}
