import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { Public } from 'src/decorators';
import { ApiOperation } from '@nestjs/swagger';
import { createArticleValidation, CreateArticleDto } from 'src/dtos/create-article.dto';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { JoiValidationPipe } from 'src/pipe';
import { ArticleFindOptions, ArticleService } from 'src/services';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService,
    private readonly articleService: ArticleService
  ) {}

  // Các API khác

    
    @Get()
    @Public()
    @ApiOperation({ summary: 'Lấy danh sách user có phân trang và filter' })
    async getRoles(@Query() options: RoleFindOptions) {
      return await this.roleService.search(options);
    }

    @Post('/createArticle')
    async createArticle(@Body(new JoiValidationPipe(createArticleValidation)) item: CreateArticleDto) {
        try {
          const newArticle = await this.articleService.addNewArticle(item);
          return newArticle;
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
