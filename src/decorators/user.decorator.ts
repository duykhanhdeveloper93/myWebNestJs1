import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CRequest } from 'src/services/base.service.type';
import { inspect } from 'util';


/**
 * Get information of current user.
 */
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    try {
       
        const request = ctx.switchToHttp().getRequest<CRequest>();
        console.log("request" + request)
        console.log("Request details:", inspect(request, { depth: null, colors: true }));
        const user = request.user;
        console.log("user" + user)
        return data ? user?.[data] : user;
    } catch (error) {
        console.log('[CurrentUserError]', error);
    }
});
