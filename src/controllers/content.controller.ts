import { Controller, Get, Post, Body, Param, Query, UploadedFile, UseInterceptors, Delete, HttpCode } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { ApiOperation } from '@nestjs/swagger';
import { createArticleValidation, CreateArticleDto } from 'src/dtos/create-article.dto';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { JoiValidationPipe } from 'src/pipe';
import { ArticleFindOptions, ArticleService } from 'src/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { join } from 'path';
import { Public } from 'src/decorators';


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
    
    @Post()
    @ApiOperation({ summary: 'Lấy danh sách article có phân trang và filter' })
    async getArticles(@Query() options: ArticleFindOptions) {
      return await this.articleService.search(options);
    }


    
    @HttpCode(200)
    @Post('/search')
    @ApiOperation({ summary: 'Get list.' })
    async getMany(@Body() options?: ArticleFindOptions) {
        const items = await this.articleService.search(options);
        return items;
    }

    


    @Post('/upload/:id')
    @Public()
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = './uploads';
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const id = req.params.id;
            cb(null, `${id}-${file.originalname}`);
          },
        }),
      }),
    )
    async uploadFile(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
    ) {
      try {
        const article = await this.articleService.getById(parseInt(id));
        if (!article) {
          return { status: false, message: 'Article không tồn tại' };
        }
    
        if (article.image_title_path) {
          const oldFilePath = join(__dirname, '../../uploads', article.image_title_path);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
    
        article.image_title_path = `${id}-${file.filename}`;
        await this.articleService.update(id, article);
        const absoluteFilePath = join(__dirname, '../../uploads', `${id}-${file.filename}`);
        console.log("absoluteFilePath: " + absoluteFilePath)
        return {
          status: true,
          message: 'Upload thành công',
          filePath: article.image_title_path,
        };
      } catch (error) {
        return { status: false, message: 'Lỗi hệ thống', error };
      }
    }
    
    @Post('/upload-base64')
    async uploadBase64File(
      @Body('base64') base64: string,
      @Body('fileName') fileName: string, // Tên file từ client
    ) {
      try {
        // Tạo thư mục nếu chưa tồn tại
        const uploadPath = './uploads';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
  
        // Lưu file từ Base64
        const fileExtension = fileName.split('.').pop(); // Lấy extension từ tên file
        const newFileName = `${Date.now()}.${fileExtension}`; // Tạo tên file duy nhất
        const filePath = join(uploadPath, newFileName);
        const base64Data = base64.replace(/^data:.+;base64,/, ''); // Loại bỏ tiền tố Base64
        fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
  
        return {
          status: true,
          message: 'Upload Base64 thành công',
          filePath: `/uploads/${newFileName}`, // Trả về đường dẫn file
        };
      } catch (error) {
        return { status: false, message: 'Lỗi hệ thống', error };
      }
    }
  
    
  
    @Delete('/deleteFile/:id')
    async deleteFile(@Param('id') id: string) {
      try {
        // Lấy bài viết theo ID
        const article = await this.articleService.getById(parseInt(id));
  
        if (!article) {
          return { status: false, message: 'Article không tồn tại' };
        }
  
        // Xóa file nếu tồn tại
        if (article.image_title_path) {
          const filePath = join(__dirname, '../../uploads', article.image_title_path);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
  
        // Xóa đường dẫn file trong database
        article.image_title_path = null;
        await this.articleService.update(id, article);
  
        return { status: true, message: 'File đã được xóa' };
      } catch (error) {
        return { status: false, message: 'Lỗi hệ thống', error };
      }
    }
  
}

