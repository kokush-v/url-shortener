import { host, port } from '@/main';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UrlModel } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlShortenerService {
  private urlRepository: Prisma.UrlModelDelegate<DefaultArgs>;

  constructor(@Inject('PRISMA_CLIENT') prisma: PrismaClient) {
    this.urlRepository = prisma.urlModel;
  }

  async createShortUrl(url: string): Promise<UrlModel> {
    const dublicateUrl = await this.findDublicateUrl(url);

    if (dublicateUrl) {
      return dublicateUrl;
    }

    const code = uuidv4().split('-')[0];
    const shortUrl = `http://${host}:${port}/${code}`;

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

  findUrl(code: string): Promise<UrlModel> {
    return this.urlRepository.findUniqueOrThrow({
      where: {
        code: code,
      },
    });
  }
}
