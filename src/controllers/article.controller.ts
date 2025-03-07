import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { Public } from 'src/decorators';
import { ApiOperation } from '@nestjs/swagger';
import { ArticleFindOptions, ArticleService } from 'src/services/article.service';
import { createArticleValidation, CreateArticleDto } from 'src/dtos/create-article.dto';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { JoiValidationPipe } from 'src/pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách article có phân trang và filter' })
  async getUsers(@Query() options: ArticleFindOptions) {
    return await this.articleService.findAllPaginated(options);
  }


  @Post('/createArticle')
  async createUser(@Body(new JoiValidationPipe(createArticleValidation)) item: CreateArticleDto) {
      try {
        const newUser = await this.articleService.addNewArticle(item);
        return newUser;
      } catch (error) {
        throw new CBadRequestException('Lỗi hệ thống');
      }
      
      
  }
}
