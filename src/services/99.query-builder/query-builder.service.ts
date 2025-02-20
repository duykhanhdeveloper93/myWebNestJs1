import { ApiProperty } from '@nestjs/swagger';
import { PageSizeEnum } from '../../common/00.enum/page-size.enum';
export interface CPaginateOptions<T> {
  page?: number;
  limit?: PageSizeEnum;
  sortBy?: keyof T;
  sortOrder?: 'ASC' | 'DESC';
}

// Tạo class để dùng với Swagger và Validation
export class CPaginateOptionsDto<T> implements CPaginateOptions<T> {
  @ApiProperty({
    description: 'Số trang',
    default: 1,
    minimum: 1
  })
  page?: number = 1;

  @ApiProperty({
    description: 'Số lượng items trên mỗi trang',
    enum: PageSizeEnum,
    default: PageSizeEnum.SMALL
  })
  limit?: PageSizeEnum = PageSizeEnum.SMALL;

  @ApiProperty({
    description: 'Sắp xếp theo trường',
    required: false
  })
  sortBy?: keyof T;

  @ApiProperty({
    description: 'Thứ tự sắp xếp',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
    required: false
  })
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

// Interface cho response
export interface CPaginateResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

