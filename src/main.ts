
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import { userAdmin } from './common/00.enum';
import { environment } from './common/02.environment';
import { uniq } from 'lodash';

function getCORSUrl() {
  const urls = [
    environment.spaUrl,
    environment.spaDevUrl,
    ...environment.originUrls,
  ].filter(Boolean);
  return urls.length > 0 ? uniq(urls) : '*';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const permissionService = app.get(PermissionService);
  await permissionService.seedPermissions(); // Khởi tạo dữ liệu permissions

  const userService = app.get(UserService);

  await userService.createRootUser(userAdmin); // Khởi tạo dữ liệu permissions

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  //#region enable cors
  // Cấu hình cái này để chạy
  app.enableCors({
    origin: getCORSUrl(),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  //#endregion

  const port = process.env.PORT_API || 3331;

  console.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  await app.listen(port);
}
bootstrap();
