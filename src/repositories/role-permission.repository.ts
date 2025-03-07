/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { PermissionEntity } from 'src/entities/03.permission/permission.entity';


import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { RolePermissionEntity } from 'src/entities/05.role-permission/role-permission.entity';

export class RolePermissionFindByRoleIds {
    roleIds: number[];
}

@Injectable()
export class RolePermissionRepository extends BaseRepository<RolePermissionEntity> {
    constructor(private dataSource: DataSource) {
        super(null, null);
    }

    async getListPermissionFromListRoleId(item: RolePermissionFindByRoleIds) {
        let roleIds: number[] = [-222];
        const query = this.dataSource
            .getRepository(PermissionEntity)
            .createQueryBuilder('permission')
            .innerJoin('permission.rolePermissions', 'rP')
            .leftJoinAndSelect('rP.role', 'role');

        if (item.roleIds && item.roleIds.length) roleIds = item.roleIds;
        query.where('role.id IN (:...roleIds)', { roleIds });
        const result = await query.orderBy('permission.createdAt', 'DESC').getManyAndCount();

        return result;
    }

    async getListRolePerFromRoleIds(item: any) {
        const query = this.dataSource
            .getRepository(RolePermissionEntity)
            .createQueryBuilder('rP')
            .leftJoinAndSelect('rP.permission', 'permission')
            .leftJoinAndSelect('rP.role', 'role');

        if (item.roleIds.length > 0) {
            query.where('rP.roleId in (:...roleIds)', { roleIds: item.roleIds });
        }

        const result = await query.orderBy('rP.createdAt', 'DESC').getManyAndCount();

        return result;
    }

  
    async getListRoleIdByPermissionName(item: any) {
        // eslint-disable-next-line prefer-const
        let listRoleIds: any[] = [];

        const query = this.dataSource
            .getRepository(RolePermissionEntity)
            .createQueryBuilder('rP')
            .innerJoin('rP.permission', 'permission')
            .innerJoinAndSelect('rP.role', 'role');

        if (item?.listPermissionName.length > 0) {
            query.andWhere('permission.name in (:...listPermissionName)', {
                listPermissionName: item.listPermissionName,
            });
        }

        if (item.siteId) {
            query.andWhere('rP.siteId = :siteId', { siteId: item.siteId });
        }
        const [items, count] = await query.getManyAndCount();

        if (count > 0) {
            for (let index = 0; index < items.length; index++) {
                let element1 = items[index];
                let roleId = parseInt(element1.roleId.toString());
                if (!listRoleIds.includes(roleId)) {
                    let object1 = {
                        roleId: roleId,
                        roleName: element1?.role.name,
                    };
                    listRoleIds.push(object1);
                }
            }
        }

        return listRoleIds;
    }
}
