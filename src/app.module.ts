import { Module } from '@nestjs/common';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './modules/cache.module';
import { RateLimitModule } from './modules/rate-limit.module';

@Module({
  imports: [UrlShortenerModule, PrismaModule, CacheModule, RateLimitModule],
  controllers: [],
})
export class AppModule {}
