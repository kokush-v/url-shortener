import { ThrottlerConfig } from '@/modules/types';
import { generateShortUrl } from '@/utils';
import 'dotenv/config';

export const isDev = process.env.NODE_ENV === 'development';

export const host = process.env.HOST || 'localhost';
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
  shortUrl: generateShortUrl('10275782', host, port),
  redirectsCount: 1,
};
