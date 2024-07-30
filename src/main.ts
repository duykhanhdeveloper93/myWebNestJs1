import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import {userAdmin} from './common/00.enum'
import { enviroment } from './common/01.enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const permissionService = app.get(PermissionService);
  await permissionService.seedPermissions(); // Khởi tạo dữ liệu permissions

  const userService = app.get(UserService);

  await userService.createRootUser(userAdmin); // Khởi tạo dữ liệu permissions

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT_API || 3331;

  console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  await app.listen(port);
}
bootstrap();
