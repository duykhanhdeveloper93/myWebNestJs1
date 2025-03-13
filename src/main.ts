import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  try {
    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);

    //#region enable cors
    app.enableCors({
      origin: getCORSUrl(),
      credentials: true,
    });
    //#endregion

    // Tăng giới hạn kích thước payload
    app.use(bodyParser.json({ limit: '50mb' })); // Giới hạn JSON payload
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Giới hạn URL-encoded payload

    const port = process.env.PORT_API || 3331;
    console.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
    await app.listen(port);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}
bootstrap();
