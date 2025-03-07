import { Entity, Column, ManyToMany, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { CBaseEntity } from '../base.entity';
import { UserEntity } from '../01.user/user.entity';


@Entity({ name: 'article' })
export class ArticleEntity extends CBaseEntity {
  @Column({ nullable: false, length: 255, type: 'varchar' , comment: 'Tiêu đề báo' })
  title: string

  @Column({ nullable: true, length: 255, type: 'varchar' , comment: 'Nội dung báo' })
  content: string

  
  @Column({ nullable: true, comment: 'Trạng thái' })
  status: number

  @Column({ nullable: true , comment: 'Loại báo' })
  type: number

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  public author: UserEntity;

}
