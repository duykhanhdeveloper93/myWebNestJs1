import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { ApiOperation } from '@nestjs/swagger';
import { createArticleValidation, CreateArticleDto } from 'src/dtos/create-article.dto';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { JoiValidationPipe } from 'src/pipe';
import { ArticleFindOptions, ArticleService } from 'src/services';

@Controller('content')
export class ContentController {
  constructor(private readonly roleService: RoleService,
    private readonly articleService: ArticleService
  ) {}


    @Post('/createArticle')
    async createArticle(@Body(new JoiValidationPipe(createArticleValidation)) item: CreateArticleDto) {
        try {
          const newArticle = await this.articleService.addNewArticle(item);
          const data : any = {
            data : newArticle,
            status: true
          }
          return data;
        } catch (error) {
          throw new CBadRequestException('Lỗi hệ thống');
        }
    }
    
    @Get()
    @ApiOperation({ summary: 'Lấy danh sách article có phân trang và filter' })
    async getArticles(@Query() options: ArticleFindOptions) {
      return await this.articleService.search(options);
    }
}
