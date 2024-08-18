import { PrismaClient } from '@prisma/client';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { Cache } from 'cache-manager';

describe('UrlShortenerController', () => {
  let urlShortenerController: UrlShortenerController;
  let urlShortenerService: UrlShortenerService;
  let cacheService: Cache;

  const url = 'https://docs.nestjs.com/';

  const cacheServiceMock = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(() => {
    cacheService = cacheServiceMock as unknown as Cache;
    urlShortenerService = new UrlShortenerService(
      new PrismaClient(),
      cacheService,
    );
    urlShortenerController = new UrlShortenerController(urlShortenerService);
  });

  describe('shorten', () => {
    it('should return short url', async () => {
      const response = await urlShortenerController.shortUrl({ url });
      expect(response.shortUrl).toBeDefined();
    });
  });
});
