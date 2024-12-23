import { Module } from '@nestjs/common';
import { commonProviders } from './common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { myWebApiControllers } from './controllers';
import { coreServices } from './services';
import { myWebApiRepositories } from './repositories';
import { myWebApiEntities } from './entities';
import { coreStrategy } from './strategies/index';

/**
 * define repositories are registered in the current scrope of module.
 *
 * using the @InjectRepository() decorator to register Repository.
 *
 * Ref: https://docs.nestjs.com/techniques/database#repository-pattern
 */
const modules = [TypeOrmModule.forFeature([...myWebApiEntities])];

@Module({
    imports: [
        ...modules
    ],
    controllers: [...myWebApiControllers],
    providers: [...myWebApiRepositories, ...coreServices , ...coreStrategy],
    exports: [...coreServices,...myWebApiRepositories],
})
export class CoreModule {}
