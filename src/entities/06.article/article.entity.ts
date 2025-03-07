import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CBaseEntity } from '../base.entity';
import { UserEntity } from '../01.user/user.entity';

@Entity('article')
export class ArticleEntity extends CBaseEntity {

  @Column({ default: false, comment: 'Tiêu đề' })
  title: string;

  @Column({ default: false, comment: 'Nội dung' })
  content: string;

  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'author' })
  author?: UserEntity;

  @Column()
  status: number;

  @Column()
  type: number;

}
