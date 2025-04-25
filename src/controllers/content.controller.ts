import { Controller, Get, Post, Body, Param, Query, UploadedFile, UseInterceptors, Delete, HttpCode, ParseIntPipe, Res, BadRequestException } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createArticleValidation, CreateArticleDto, updateArticleValidation, UpdateArticleDto } from 'src/dtos/create-article.dto';
import { CBadRequestException } from 'src/exception/badrequest.exception';
import { JoiValidationPipe } from 'src/pipe';
import { ArticleFindOptions, ArticleService } from 'src/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { join } from 'path';
import { Public } from 'src/decorators';


@Controller('content')
@ApiTags('content')
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

    @Post('/updateArticle')
    async updateArticle(@Body(new JoiValidationPipe(updateArticleValidation)) item: UpdateArticleDto) {
        try {
          const updateArticle = await this.articleService.update(item.id,item);
          const data : any = {
            data : updateArticle,
            status: true
          }
          return data;
        } catch (error) {
          throw new CBadRequestException('Lỗi hệ thống');
        }
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find by id' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
          const article = await this.articleService.getById(id);
          if(article.id != null) {
            return {data : article , status: true};
          } else {
            return {data : null , status: false};
          } 
    }


    @Post('delete-many')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete multiple articles by ids' })
    async deleteMany(@Body() payload: { ids: number[] }) {
        if (!payload.ids || !Array.isArray(payload.ids) || payload.ids.length === 0) {
            throw new BadRequestException('Vui lòng cung cấp mảng các id hợp lệ');
        }

        let successCount = 0;
        const failedIds = [];

        for (const id of payload.ids) {
            try {
                const result = await this.articleService.delete(id);
                if (result) {
                    successCount++;
                } else {
                    failedIds.push(id);
                }
            } catch (error) {
                failedIds.push(id);
            }
        }

        return {
            status: successCount > 0,
            message: `Đã xóa thành công ${successCount}/${payload.ids.length} article`,
            data: {
                successCount,
                totalCount: payload.ids.length,
                failedIds: failedIds.length > 0 ? failedIds : []
            }
        };
    }
    
    @HttpCode(200)
    @Post('/search')
    @ApiOperation({ summary: 'Get list.' })
    async getMany(@Body() options?: ArticleFindOptions) {
      const listData = await this.articleService.search(options);
      if(listData != null) {
        return {data : listData , status: true};
      } else {
        return {data : null , status: false};
      }
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
    
        article.image_title_path = `${file.filename}`;
        await this.articleService.update(id, article);
        const absoluteFilePath = join(__dirname, '../../uploads', `${file.filename}`);
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
       

        const filePath = join(uploadPath, fileName);
        const base64Data = base64.replace(/^data:.+;base64,/, ''); // Loại bỏ tiền tố Base64
        fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

        return {
          status: true,
          message: 'Upload Base64 thành công',
          filePath: `/uploads/${fileName}`, // Trả về đường dẫn file
        };
      } catch (error) {
        return { status: false, message: 'Lỗi hệ thống', error };
      }
    }


    @Get('/image/:filename')
    @Public()
    getImage(@Param('filename') filename: string, @Res() res) {
      const filePath = join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      } else {
        return res.status(404).send('File not found');
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

