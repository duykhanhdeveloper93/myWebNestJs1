import { Column, Entity, ManyToOne } from 'typeorm';
import { CBaseEntity } from '../base.entity';
import { UserEntity } from '../01.user/user.entity';
import { RoleEntity } from '../03.role/role.entity';


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
