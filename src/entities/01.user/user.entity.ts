import { Entity, Column, OneToMany, Generated, PrimaryColumn } from 'typeorm';
import { RoleEntity } from '../02.role/role.entity';
import { bigint, CBaseEntity } from '../base.entity';
import { UserRoleEntity } from '../04.user-role/user-role.entity';
import { Exclude } from 'class-transformer';


// user.entity.ts
export interface IUser {
  id: number;
  // Các thuộc tính khác mà bạn cần
}



@Entity('user', {
  synchronize: false,
})
export class UserEntity extends CBaseEntity {

  @Generated('increment')
  @PrimaryColumn('bigint', { transformer: [bigint] })
  id!: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  status: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, select: false })
  passwordHash!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, select: false })
  isSys?: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, select: false })
  passwordHashTemp?: string;

  @OneToMany(() => UserRoleEntity, (role) => role.user, {
    createForeignKeyConstraints: false,
  })
  public userRoles: UserRoleEntity[];

}
