import { CacheModule as CacheNestModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { redisHost, redisPort } from '@/constants';

@Module({
  imports: [
    CacheNestModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisHost,
      port: redisPort,
      ttl: 60,
      max: 100,
    }),
  ],
})
export class CacheModule {}
