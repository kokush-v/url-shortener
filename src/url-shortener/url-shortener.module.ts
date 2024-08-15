import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
  exports: [UrlShortenerService],
  imports: [PrismaModule],
})
export class UrlShortenerModule {}
