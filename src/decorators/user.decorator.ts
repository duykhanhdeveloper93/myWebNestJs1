import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CRequest } from 'src/services/base.service.type';
import { inspect } from 'util';


/**
 * Get information of current user.
 */
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    try {
        const request = ctx.switchToHttp().getRequest<CRequest>();
        const user = request.user;
        return data ? user?.[data] : user;
    } catch (error) {
        
    }
});
