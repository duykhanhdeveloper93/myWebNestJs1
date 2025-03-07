import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { myWebApiControllers } from './controllers';
import { myWebApiEntities } from './entities';
import { coreServices } from './services';
import { CoreModule } from './core.module';
import { environment } from './common/02.environment';
import { coreStrategy } from './strategies/index';
import { RouterModule, Routes } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { expiresIn, jwtConstants } from './common/00.enum';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { myWebApiRepositories } from './repositories';

import { coreGuards} from './guards';
const {
  dbHost,
  dbName,
  dbPort,
  dbPw,
  dbType,
  dbUser,
  dbSynchronize
} = environment;

const routes: Routes = [
  {
      path: '/',
      module: CoreModule,
  },
];


const modules = [CoreModule] as any[];

const entities = [...myWebApiEntities];

if (environment.enableRedis) {
  modules.push(
      CacheModule.register({
          isGlobal: true,
          store: redisStore,
          host: environment.redisHost,
          port: environment.redisPort,
          username: environment.redisUsername,
          password: environment.redisPw,
          no_ready_check: true,
      }),
  );
}
@Module({
  imports: [
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: dbType as any,
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPw,
      database: dbName,
      synchronize: true,
      entities,
      connectorPackage: 'mysql2',
      timezone: 'local',
      cache: false,
  }),
  JwtModule.register({
    global: true,
    secret: environment.jwtSecretATKey || jwtConstants.secret,
    signOptions: { expiresIn: '3660s' },
  }),
  TypeOrmModule.forFeature(entities),
    ...modules

  ],
  controllers: [...myWebApiControllers],
  providers: [
    ...coreServices,
    ...coreStrategy,
    ...myWebApiRepositories,
    ...coreGuards
  ],
})
export class AppModule {}
