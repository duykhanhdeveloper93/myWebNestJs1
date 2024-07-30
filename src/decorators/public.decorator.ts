import { SetMetadata } from '@nestjs/common';
import { IS_GUEST_KEY, IS_PUBLIC_KEY } from 'src/common/00.enum';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Guest = () => SetMetadata(IS_GUEST_KEY, true);
