
import { Brackets, DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from 'src/entities/06.article/article.entity';
import { ArticleFindOptions } from 'src/services/article.service';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';

@Injectable()
export class ArticleRepository extends BaseRepository<ArticleEntity> {
    constructor(private dataSource: DataSource) {
        super(ArticleEntity, dataSource.createEntityManager());
    }

    async search(options: ArticleFindOptions) {
        const query = this.dataSource
            .getRepository(ArticleEntity)
            .createQueryBuilder('art')
            
        if (options?.keyword) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('(TRIM(art.title) LIKE :text)', { text: '%' + options.keyword + '%' }) 
                }),
            );
        }

        const result = await query
            .skip(options?.skip || 0)
            .take(options?.top || PageSizeEnum.SMALL)
            .orderBy('art.createdAt', 'DESC')
            .getManyAndCount();

            return result;
    }
    

}