import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { RoleEntity } from "src/entities/03.role/role.entity";
import { Brackets, DataSource } from "typeorm";
import { RoleFindOptions } from "src/services";
import { PageSizeEnum } from "src/common/00.enum/page-size.enum";


@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
    constructor(private dataSource: DataSource) {
        super(RoleEntity, dataSource.createEntityManager());
    }

    async search(options: RoleFindOptions) {
        const query = this.dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('role')
            
      

        if (options?.keyword) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('(TRIM(role.name) LIKE :text)', { text: '%' + options.keyword + '%' }) 
                }),
            );
        }

       
        
        const result = await query
            .skip(options?.skip || 0)
            .take(options?.top || PageSizeEnum.SMALL)
            .orderBy('role.createdAt', 'DESC')
            .getManyAndCount();

         return result;
    }

 }
