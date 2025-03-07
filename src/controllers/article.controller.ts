import { Controller, Get, Post, Body, Query  } from '@nestjs/common';
import { ArticleFindOptions, ArticleService } from '../services/article.service';
import { Public } from 'src/decorators/public.decorator';
import { JoiValidationPipe } from 'src/pipe/joi.validation';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { ApiOperation } from '@nestjs/swagger';
import { CreateArticleDto, createArticleValidation } from 'src/dtos/create-article.dto';




@Controller('articles')
export class ArticleController {
  // constructor(private readonly articleService: ArticleService) {}


  // @Post('/createArticle')
  // async createArticle(@Body(new JoiValidationPipe(createArticleValidation)) item: CreateArticleDto) {
  //     try {
  //       const newArticle = await this.articleService.addNewArticle(item);
  //       return newArticle;
  //     } catch (error) {
  //       throw new CBadRequestException('Lỗi hệ thống');
  //     }
     
      
  // }
  
  // @Get()
  // @Public()
  // @ApiOperation({ summary: 'Lấy danh sách article có phân trang và filter' })
  // async getArticles(@Query() options: ArticleFindOptions) {
  //   return await this.articleService.findAllPaginated(options);
  // }

}

