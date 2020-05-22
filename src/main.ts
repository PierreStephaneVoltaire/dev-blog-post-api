/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import * as path from 'path';


async function bootstrap() {
  const httpsOptions = process.env.environment === 'prod' ? {
    key: readFileSync(path.join(__dirname, 'assets', 'privkey.pem')),
    cert: readFileSync(path.join(__dirname, 'assets', 'cert.pem'))
  } : null;
  const appOptions = { httpsOptions };
  const app = await NestFactory.create(
    AppModule
  );
  const secureApp = await NestFactory.create(
    AppModule,
    appOptions
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  secureApp.setGlobalPrefix(globalPrefix);

  const port: number =
    process.env.api_port ? Number(process.env.api_port) : 80;
  const securePort: number =
    process.env.api_secure_port ? Number(process.env.api_secure_port) : 443;

  app.enableCors();
  app.use(helmet());
  secureApp.enableCors();
  secureApp.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Post Api')
    .setDescription('The Post API description')
    .setVersion('1.0')
    .addTag('post')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const secureDocument = SwaggerModule.createDocument(secureApp, options);

  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api', secureApp, secureDocument);


  if (process.env.environment === 'prod') {
    await secureApp.listen(securePort).then(() => {
      console.log(`running in https://localhost:${securePort}/api`);
    });
  } else {
    await app.listen(port).then(() => {
      console.log(`running in http://localhost:${port}/api`);
    });
  }
}

bootstrap();
