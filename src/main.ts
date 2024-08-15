import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

export const host = process.env.HOST || 'host';
export const port = process.env.PORT || 4200;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server is running on http://${host}:${port}`);
}
bootstrap();
