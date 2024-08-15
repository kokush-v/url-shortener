import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { redisHost, redisPort } from './constants';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisHost,
      port: redisPort,
      ttl: 60,
      max: 100,
    }),
    UrlShortenerModule,
    PrismaModule,
  ],
  controllers: [],
})
export class AppModule {}
