
import {
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    ValueTransformer,
    Generated,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    AfterInsert,
    AfterUpdate,
    Index
} from 'typeorm';

import { UserEntity } from './01.user/user.entity';

export const bigint: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): number => parseInt(databaseValue),
};

export class CBaseEntity extends BaseEntity {
    @Generated('increment')
    @PrimaryColumn('bigint', { transformer: [bigint] })
    id!: number;

    @ManyToOne(() => UserEntity, {
        createForeignKeyConstraints: false,
    })
    @Index()
    @JoinColumn({ name: 'createdBy' })
    createdBy!: UserEntity;

    @ManyToOne(() => UserEntity, {
        createForeignKeyConstraints: false,
    })
    @Index()
    @JoinColumn({ name: 'modifiedBy' })
    modifiedBy!: UserEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    modifiedAt!: Date;
    /**
     * Sử dụng cho softDelete
     */
   
    @AfterInsert()
    @AfterUpdate()
    updateStatus() {
        this.createdBy = null;
        this.modifiedBy = null;
    }
}
