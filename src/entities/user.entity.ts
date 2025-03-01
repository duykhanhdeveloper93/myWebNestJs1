import { Entity, Column, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CBaseEntity } from './base.entity';
import { UserRoleEntity } from './user_role.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends CBaseEntity {
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
  @Column({ nullable: false, select: false })
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
