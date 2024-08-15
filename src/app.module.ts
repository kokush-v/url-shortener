import { Module } from '@nestjs/common';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UrlShortenerModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
