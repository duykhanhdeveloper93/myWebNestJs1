import { Inject, Injectable } from '@nestjs/common';

import { CPaginateOptions } from './99.query-builder/query-builder.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CRequest } from './base.service.type';
import { REQUEST } from '@nestjs/core';
import { BaseService } from './base.service';
import { CreateArticleDto } from 'src/dtos/create-article.dto';
import { ArticleEntity } from 'src/entities/06.article/article.entity';
import { ArticleRepository } from 'src/repositories/article.repository';




export interface ArticleFindOptions extends CPaginateOptions<ArticleEntity> {
  keyword?: string;

}

@Injectable()
export class ArticleService extends BaseService<ArticleEntity, ArticleRepository> {
    constructor(
        @Inject(REQUEST) request: CRequest,
        @InjectRepository(ArticleEntity) repository: ArticleRepository,
        private readonly articleRepository: ArticleRepository,
    ) {
        console.log("repository"+ repository)
        super(request, repository);
    }



  async addNewArticle(createArticleDto: CreateArticleDto) {
    const article : ArticleEntity = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
     
  }


    async search(options: ArticleFindOptions) {
      const [items, count] = await this.articleRepository.search(options);
      return { items: items, count: count };
    }
  

}