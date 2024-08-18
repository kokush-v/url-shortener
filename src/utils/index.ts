import { isDev } from '@/constants';

export function generateShortUrl(
  code: string,
  host: string,
  port: number | string,
): string {
  return isDev ? `http://${host}:${port}/${code}` : `http://${host}/${code}`;
}
