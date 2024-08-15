import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: new PrismaClient(),
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class PrismaModule {}
