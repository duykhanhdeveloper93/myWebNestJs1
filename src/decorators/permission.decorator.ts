import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/common/00.enum';

export const PER_KEY = 'permissiondecorators';
export const PermissionDecorators = (...permissions: Permission[]) => SetMetadata(PER_KEY, permissions);
