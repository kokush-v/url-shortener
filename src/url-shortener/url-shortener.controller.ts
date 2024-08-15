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
import {
  CreateUrlShortenerDto,
  CreateUrlShortenerResponse,
  IRedirect,
} from './types/url-shortener';
import { UrlShortenerService } from './url-shortener.service';
import { TryCatchInterceptor } from '@/middleware/tryCatch';
import { ValidatorPipe } from '@/validators/validation.pipe';

@UseInterceptors(TryCatchInterceptor)
@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('/shorten')
  @UsePipes(new ValidatorPipe())
  async shortUrl(
    @Body()
    { url }: CreateUrlShortenerDto,
  ): Promise<CreateUrlShortenerResponse> {
    const response = await this.urlShortenerService.createShortUrl(url);
    return { shortUrl: response.shortUrl };
  }

  @Get('/:code')
  @Redirect()
  async redirectUrl(@Param('code') code: string): Promise<IRedirect> {
    const response = await this.urlShortenerService.findUrl(code);

    return { url: response.url, statusCode: 302 };
  }
}
