import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { first } from 'lodash';
import { BaseService } from './base.service';
import { CRequest } from './base.service.type';
import { NJRS_REQUEST } from 'nj-request-scope';
import { REQUEST } from '@nestjs/core';
import { PageSizeEnum } from 'src/common/00.enum/page-size.enum';
import { CPaginateOptions, CPaginateResult } from './99.query-builder/query-builder.service';
import { ArticleEntity } from 'src/entities/06.article/article.entity';
import { ArticleRepository } from 'src/repositories/article.repository';
import { CreateArticleDto } from 'src/dtos/create-article.dto';




export interface ArticleFindOptions extends CPaginateOptions<ArticleEntity> {
  keyword?: string;

}


@Injectable()
export class ArticleService extends BaseService<ArticleEntity, ArticleRepository> {
  constructor(
    protected articleRepository: ArticleRepository,
    private dataSource: DataSource,
    @Inject(REQUEST) request: CRequest,
  ) {
    super(request, articleRepository);
  }


  async addNewArticle(createArticleDto: CreateArticleDto) {

    const currentUser= this.getCurrentUser();
    createArticleDto.createdAt = new Date();
    createArticleDto.createdBy = currentUser.id as any;

    const aticle : ArticleEntity = this.articleRepository.create(createArticleDto);

    try {
      this.articleRepository.save(aticle);
      return { data : null,status: true, message: "Tạo người dùng thành công"};
    } catch (error) {
      console.log(error)
     
    }
     
  }










  async findAllPaginated(options: ArticleFindOptions): Promise<CPaginateResult<ArticleEntity>> {
    const queryBuilder = this.articleRepository.createQueryBuilder('article');
        // Kết hợp bảng userRole
      

    // Apply filters
    if (options.keyword) {
      queryBuilder.where(
        '(article.title LIKE :keyword OR article.title LIKE :keyword)',
        { keyword: `%${options.keyword}%` }
      );
    }


    // Apply sorting
    if (options.sortBy) {
      queryBuilder.orderBy(`user.${options.sortBy}`, options.sortOrder || 'ASC');
    }

    // Apply pagination
    const page = options.page || 1;
    const limit = options.limit || PageSizeEnum.SMALL;
    const skip = (page - 1) * limit;

    queryBuilder.skip(skip).take(limit);

    // Execute query
    const [items, total] = await queryBuilder.getManyAndCount();
    console.log("item: " +items)
    console.log("Items: ", JSON.stringify(items, null, 2));
    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        
      }
    };
  }


  // Thêm các method khác nếu cần
}