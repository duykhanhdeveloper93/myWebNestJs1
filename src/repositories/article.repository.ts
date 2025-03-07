
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from 'src/entities/06.article/article.entity';

@Injectable()
export class ArticleRepository extends BaseRepository<ArticleEntity> {
    constructor(private dataSource: DataSource) {
        super(ArticleEntity, dataSource.createEntityManager());
    }
}