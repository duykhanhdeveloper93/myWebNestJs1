import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';



import { HeadersKeyEnum, environment, expiresIn, jwtConstants, redisConsts, refreshTokenExpiresIn} from 'src/common';
import { RCacheManager } from './CacheManager';
import {CIncomingHttpHeaders } from '../common/04.types';
import { ICurrentUser } from './user.service';
@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService,
        private readonly cacheManager : RCacheManager
       ) {

        }

    /**
     * generate access_token for external users
     * @param item
     * @returns
     */
    // async generateAccessKeyForExternalUsers(item: ICurrentUser) {
    //     const { id, loginName, name } = item;
    //     const user = { id, loginName, name } as ICurrentUser;
    //     const clientId = item.clientId || uuidv4();
    //     const [access_token] = await Promise.all([
    //         this.jwtService.signAsync(user, {
    //             expiresIn: `${expiresInForExternalUsers}s`,
    //             secret: environment.jwtSecretATKey || jwtConstants.secret,
    //         }),
    //     ]);

    //     return {
    //         logged_in: true,
    //         access_token,
    //         client_Id: `${user.id}:${clientId}`,
    //     };
    // }

    /**
     * generate access_token, refresh_token và client id
     * @param item
     * @returns
     */
    async generateKey(item: any) {
        const { id, username, name } = item;
        const user = { id, username, name } as any;
        const clientId = item.clientId || uuidv4();
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(user, {
                expiresIn: `${expiresIn}s`,
                secret: environment.jwtSecretATKey || jwtConstants.secret,
            }),
            this.jwtService.signAsync(
                {
                    clientId,
                    ...user,
                },
                { expiresIn: `${refreshTokenExpiresIn}s`, secret: environment.jwtSecretRTKey },
            ),
        ]);
        await this.cacheManager.set(`${redisConsts.prefixRefreshToken}:${user.id}:${clientId}`, refresh_token, {
            ttl: refreshTokenExpiresIn,
        });
        return {
            logged_in: true,
            access_token,
            refresh_token,
            client_Id: `${user.id}:${clientId}`,
        };
    }

    // async sign(payload: any, options?: JwtSignOptions) {
    //     const token = await this.jwtService.signAsync(payload, options);
    //     return token;
    // }

    // async verify<T>(token: string): Promise<T> {
    //     const payload = await this.jwtService.verifyAsync(token);
    //     return payload;
    // }

    /**
     * Refresh lại access_token khi current access_token hết hạn.
     *
     * Dựa trên refresh_token và client id để tạo token mới.
     * @param request
     * @returns
     */
    // async refresh(request: Request) {
    //     const headers = request.headers as CIncomingHttpHeaders;
    //     const prefixCode = `${redisConsts.prefixRefreshToken}:${headers[HeadersKeyEnum.ClientId]}`;
    //     const refreshToken = (await this.cacheManager.get(prefixCode)) as string;

    //     if (!refreshToken) {
    //         throw new UnauthorizedException(ResponseCodeEnum.REQUIRE_SIGN_IN);
    //     }

    //     if (refreshToken !== headers[HeadersKeyEnum.RT]) {
    //         throw new CBadRequestException(ResponseCodeEnum.INVALID_RT);
    //     }

    //     const payload = await this.jwtService.verifyAsync<ICurrentUser>(refreshToken, {
    //         secret: environment.jwtSecretRTKey,
    //     });
    //     const result = await this.generateKey(payload);
    //     return result;
    // }

    async loggedIn(request: Request) {
        const headers = request.headers as CIncomingHttpHeaders;//
        const prefixCode = `${redisConsts.prefixRefreshToken}:${headers[HeadersKeyEnum.ClientId]}`;
        const refreshToken = (await this.cacheManager.get(prefixCode)) as string;
        const accessToken = headers[HeadersKeyEnum.AS];
        for (const [key, value] of Object.entries(headers)) {
            console.log(`${key}: ${value}`);
        }
  
        if (!accessToken || !refreshToken) return false;

        try {
            await Promise.all([
                this.jwtService.verifyAsync<ICurrentUser>(refreshToken, {
                    secret: environment.jwtSecretRTKey,
                }),
                this.jwtService.verifyAsync<ICurrentUser>(accessToken, {
                    secret: environment.jwtSecretATKey,
                }),
            ]);

            return true;
        } catch {
            return false;
        }
    }
}
