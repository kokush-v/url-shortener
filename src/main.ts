import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { host, port } from './constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server is running on http://${host}:${port}`);
}
bootstrap();
