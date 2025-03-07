import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { Public } from 'src/decorators';
import { ApiOperation } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Các API khác

    
    @Get()
    @Public()
    @ApiOperation({ summary: 'Lấy danh sách user có phân trang và filter' })
    async getRoles(@Query() options: RoleFindOptions) {
      return await this.roleService.search(options);
    }
}
