import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import {userAdmin} from './common/00.enum'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const permissionService = app.get(PermissionService);
  await permissionService.seedPermissions(); // Khởi tạo dữ liệu permissions

  const userService = app.get(UserService);

  await userService.createRootUser(userAdmin); // Khởi tạo dữ liệu permissions
  await app.listen(3000);
}
bootstrap();
