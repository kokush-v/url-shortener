import { host, port } from '@/constants';
import { generateShortUrl } from '@/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UrlModel } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlShortenerService {
  private urlRepository: Prisma.UrlModelDelegate<DefaultArgs>;

  constructor(
    @Inject('PRISMA_CLIENT') prisma: PrismaClient,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.urlRepository = prisma.urlModel;
  }

  async createShortUrl(url: string): Promise<UrlModel> {
    const dublicateUrl = await this.findDublicateUrl(url);

    if (dublicateUrl) {
      return dublicateUrl;
    }

    const code = uuidv4().split('-')[0];
    const shortUrl = generateShortUrl(code, host, port);

    const response = await this.urlRepository.create({
      data: {
        url,
        code,
        shortUrl,
      },
    });

    return response;
  }

  async findDublicateUrl(url: string): Promise<UrlModel | null> {
    return this.urlRepository.findUnique({
      where: {
        url,
      },
    });
  }

  async updateUrlStats(code: string): Promise<UrlModel> {
    return this.urlRepository.update({
      where: {
        code,
      },
      data: {
        redirectsCount: {
          increment: 1,
        },
      },
    });
  }

  async findUrl(code: string): Promise<UrlModel> {
    const cachedData = await this.cacheService.get<UrlModel>(code);

    if (cachedData) {
      return cachedData;
    } else {
      const url = await this.urlRepository.findUniqueOrThrow({
        where: {
          code,
        },
      });
      await this.cacheService.set(code, url);

      return url;
    }
  }
}
