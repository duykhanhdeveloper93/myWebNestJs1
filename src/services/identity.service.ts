import { InjectRepository } from '@nestjs/typeorm';

import { In } from 'typeorm';
import { filter, isNil, map, omitBy } from 'lodash';
import { Permission, redisConsts, redisTtl } from '../common';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';
import { RCacheManager } from './CacheManager';
import { UserRoleEntity } from '../entities/user_role.entity';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { RolePermissionRepository } from '../repositories/role-permission.repository';
import { permissions } from 'src/common/03.seeding';


export type UserIdentity = {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    cId?: number;
    username: string;
    password: string;
    
};

export class IdentityService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository,
        @InjectRepository(UserRoleEntity)
        private readonly userRoleRepository: UserRoleRepository,
        @InjectRepository(RolePermissionEntity)
        private readonly rolePermissionRepository: RolePermissionRepository,
        private cacheService: RCacheManager,
    ) {}

    async aggreate(userId: number) {
        const [user, userRoles] = await Promise.all([
            this.userRepository.findOneOrFail({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,

                    isSys: true,
                },
                where: {
                    id: userId,
                },
                
            }),
            this.userRoleRepository.find({
                where: {
                    userId,
                },
                relations: { role: true },
                select: {
                    roleId: true,
                },
            }),
        ]);

        const roleIds = map(
            filter(userRoles, (ur) => {
                return !!ur.role; // Ignore roles deleted.
            }),
            'roleId',
        );
        const rolePermissions = await this.rolePermissionRepository.find({
            where: {
                roleId: In(roleIds),
            },
            select: {
                permissionId: true,
            },
        });

        const rolePermissionIds: string[] = map(rolePermissions, 'permissionId') as unknown as string[];

        const pers = filter(permissions, (p) => {
            return rolePermissionIds.includes(`${p.id}`);
        });

        const nameOfPers = map(pers, 'name') as Permission[];

        const userIdentity = omitBy({ ...user, pers: nameOfPers }, isNil) as unknown as UserEntity & {
            pers;
            cId?: number;
        };

        return userIdentity;
    }
}
