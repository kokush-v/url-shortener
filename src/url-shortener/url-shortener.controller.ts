import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { IRedirect } from './types/index.types';
import { UrlShortenerService } from './url-shortener.service';
import { TryCatchInterceptor } from '@/middleware/tryCatch';
import { ValidatorPipe } from '@/validators/validation.pipe';
import { UrlModel } from '@prisma/client';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  CreateUrlShortenerDto,
  CreateUrlShortenerResponseDto,
  UrlModelDto,
} from './types/index.dto';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { getStatsExample } from '@/constants';

@ApiTags('url-shortener')
@UseInterceptors(TryCatchInterceptor)
@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('/shorten')
  @ApiCreatedResponse({
    description: 'The URL has been successfully shortened.',
    type: CreateUrlShortenerResponseDto,
  })
  @UsePipes(new ValidatorPipe())
  async shortUrl(
    @Body()
    { url }: CreateUrlShortenerDto,
  ): Promise<CreateUrlShortenerResponseDto> {
    const response = await this.urlShortenerService.createShortUrl(url);
    return { shortUrl: response.shortUrl };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('url')
  @Get('/:code')
  @Redirect()
  @ApiDefaultResponse({
    description: 'Should redirect to the original URL.',
  })
  async redirectUrl(@Param('code') code: string): Promise<IRedirect> {
    this.urlShortenerService.updateUrlStats(code);
    const response = await this.urlShortenerService.findUrl(code);

    return { url: response.url, statusCode: 302 };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('url-stats')
  @CacheTTL(30)
  @Get('/stats/:code')
  @ApiOkResponse({
    description: 'The URL stats have been successfully fetched.',
    type: UrlModelDto,
    example: getStatsExample,
  })
  async getStats(@Param('code') code: string): Promise<UrlModel> {
    return this.urlShortenerService.findUrl(code);
  }
}
