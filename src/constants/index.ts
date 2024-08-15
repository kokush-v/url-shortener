import 'dotenv/config';

export const host = process.env.HOST || 'host';
export const port = process.env.PORT || 4200;

export const redisHost = process.env.REDIS_HOST || 'localhost';
export const redisPort = process.env.REDIS_PORT || 6379;
