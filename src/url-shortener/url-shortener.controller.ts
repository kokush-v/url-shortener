import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Redirect,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  CreateUrlShortenerDto,
  CreateUrlShortenerResponse,
  IRedirect,
} from './types/url-shortener';
import { UrlShortenerService } from './url-shortener.service';
import { TryCatchInterceptor } from '@/middleware/tryCatch';
import { ValidatorPipe } from '@/validators/validation.pipe';
import { UrlModel } from '@prisma/client';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(TryCatchInterceptor)
@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('/shorten')
  @UsePipes(new ValidatorPipe())
  async shortUrl(
    @Body()
    { url }: CreateUrlShortenerDto,
    @Ip() ip: string,
  ): Promise<CreateUrlShortenerResponse> {
    const response = await this.urlShortenerService.createShortUrl(url);
    console.log(ip);
    return { shortUrl: response.shortUrl };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('url')
  @Get('/:code')
  @Redirect()
  async redirectUrl(@Param('code') code: string): Promise<IRedirect> {
    this.urlShortenerService.updateUrlStats(code);
    const response = await this.urlShortenerService.findUrl(code);

    return { url: response.url, statusCode: 302 };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('url-stats')
  @CacheTTL(30)
  @Get('/stats/:code')
  async getStats(@Param('code') code: string): Promise<UrlModel> {
    return this.urlShortenerService.findUrl(code);
  }
}
