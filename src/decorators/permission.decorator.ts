import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from 'src/common/00.enum';

export const PER_KEY = 'permissions';
export const Permission = (...permissions: PermissionEnum[]) => SetMetadata(PER_KEY, permissions);
