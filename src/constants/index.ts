import { ThrottlerConfig } from '@/modules/types';
import 'dotenv/config';

export const host = process.env.HOST || 'host';
export const port = process.env.PORT || 4200;

export const redisHost = process.env.REDIS_HOST || 'localhost';
export const redisPort = process.env.REDIS_PORT || 6379;

export const rateLimitConfig: ThrottlerConfig = {
  limit: 10, // requests
  ttl: 60, // seconds
  redisUrl: `redis://${redisHost}:${redisPort}`,
};

export const getStatsExample = {
  id: '66c25d4b17d54f754d39e8d1',
  url: 'https://www.google.com',
  code: '10275782',
  shortUrl: 'http://localhost:3001/10275782',
  redirectsCount: 1,
};
