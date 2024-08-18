import { host, port } from '@/constants';
import { generateShortUrl } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlShortenerDto {
  @ApiProperty({
    description: 'The URL to shorten',
    example: 'https://www.google.com',
  })
  url: string;
}

export class CreateUrlShortenerResponseDto {
  @ApiProperty({
    description: 'The shortened URL',
    example: generateShortUrl('10275782', host, port),
  })
  shortUrl: string;
}

export class UrlModelDto {
  @ApiProperty({
    description: 'The original URL',
  })
  url: string;

  @ApiProperty({
    description: 'The unique code for the shortened URL',
  })
  code: string;

  @ApiProperty({
    description: 'The shortened URL',
  })
  shortUrl: string;

  @ApiProperty({
    description: 'The number of times the URL has been visited',
  })
  redirectsCount: number;
}
