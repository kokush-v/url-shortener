export interface ThrottlerConfig {
  ttl: number;
  limit: number;
  redisUrl: string;
}
