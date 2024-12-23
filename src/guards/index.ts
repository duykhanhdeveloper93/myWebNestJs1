import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PermissionGuard } from './permission.guard';

export * from './auth.guard';
export * from './permission.guard';

export const coreGuards = [
   {
      provide: APP_GUARD,
      useClass: AuthGuard,
  },
  {
      provide: APP_GUARD,
      /**
       * @see https://docs.nestjs.com/security/authorization
       */
      useClass: PermissionGuard,
  },
   
];
