import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';


export *  from './jwt.strategy';



export const coreStrategy = [
    JwtStrategy,
    ConfigService
];
