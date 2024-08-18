import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { host, port } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('Shorten your URLs with ease')
    .setVersion('1.0')
    .addTag('url-shortener')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-info', app, document);

  await app.listen(port);
  console.log(`Server is running on http://${host}:${port}`);
}
bootstrap();
