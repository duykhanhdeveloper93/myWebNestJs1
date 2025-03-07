import { Inject, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { BaseService } from './base.service';
import { CRequest } from './base.service.type';
import { REQUEST } from '@nestjs/core';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { CPaginateOptions } from './99.query-builder/query-builder.service';
import { ArticleEntity } from 'src/entities/06.article/article.entity';
import { CreateArticleDto } from 'src/dtos/create-article.dto';
import { ArticleRepository } from 'src/repositories/article.repository';



export interface ArticleFindOptions extends CPaginateOptions<ArticleEntity> {
  keyword?: string;

}

@Injectable()
export class ArticleService extends BaseService<ArticleEntity, ArticleRepository> {
    constructor(
        private articleRepository: ArticleRepository,
        protected dataSource: DataSource,
        protected repository: ArticleRepository,
        @Inject(REQUEST) request: CRequest,
    ) {
        super(request, repository);
    }



  async addNewArticle(createArticleDto: CreateArticleDto) {
    const article : ArticleEntity = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
     
  }


}