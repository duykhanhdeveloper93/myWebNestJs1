import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEnum } from "src/common/00.enum/permission.enum";
import { PermissionEntity } from "src/entities";
import { PermissionRepository } from "src/repositories/permission.repository";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async seedPermissions() {
    const permissions = Object.values(PermissionEnum);
    for (const permission of permissions) {
        const exists = await this.permissionRepository.findOne({
            where: { name: permission }
            
          });
      if (!exists) {
        const newPermission = this.permissionRepository.create({ name: permission });
        await this.permissionRepository.save(newPermission);
      }
    }
  }
}
