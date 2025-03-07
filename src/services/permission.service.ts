import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/common/00.enum/permission.enum";
import { PermissionEntity } from "src/entities";
import { PermissionRepository } from "src/repositories/permission.repository";
import { BaseService } from "./base.service";
import { CRequest } from "./base.service.type";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class PermissionService extends BaseService<PermissionEntity, PermissionRepository> {
    constructor(
        @Inject(REQUEST) request: CRequest,
        @InjectRepository(PermissionEntity) repository: PermissionRepository,
    ) {
        super(request, repository);
    }


  async seedPermissions() {
    const permissions = Object.values(Permission);
    for (const permission of permissions) {
        const exists = await this.repository.findOne({
            where: { name: permission }
            
          });
      if (!exists) {
        const newPermission = this.repository.create({ name: permission });
        await this.repository.save(newPermission);
      }
    }
  }
}
