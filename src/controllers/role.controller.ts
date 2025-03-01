import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleFindOptions, RoleService } from '../services/role.service';
import { Public } from 'src/decorators';
import { ApiOperation } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() createRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  // Các API khác

    
    @Get()
    @Public()
    @ApiOperation({ summary: 'Lấy danh sách user có phân trang và filter' })
    async getUsers(@Query() options: RoleFindOptions) {
      return await this.roleService.findAllPaginated(options);
    }
}
