import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/00.enum/role.enum';


export const ROLES_KEY = 'uRoles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);