import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { myWebApiControllers } from './controllers';
import { myWebApiEntities } from './entities';
import { coreServices } from './services';
import { CoreModule } from './core.module';
import { enviroment } from './common/01.enviroment';
import { coreStrategy } from './strategies/index';
import { RouterModule, Routes } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { expiresIn, jwtConstants } from './common/00.enum';

const {
  dbHost,
  dbName,
  dbPort,
  dbPw,
  dbType,
  dbUser,
  dbSynchronize
} = enviroment;

const routes: Routes = [
  {
      path: '/',
      module: CoreModule,
  },
];

const modules = [CoreModule] as any[];

const entities = [...myWebApiEntities];

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
      synchronize: dbSynchronize,
      entities,
      
      timezone: 'local',
      cache: false,
  }),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
  TypeOrmModule.forFeature(entities),
    ...modules

  ],
  controllers: [...myWebApiControllers],
  providers: [
    ...coreServices,
    ...coreStrategy,
  ],
})
export class AppModule {}
