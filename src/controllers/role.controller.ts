import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';

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
}
