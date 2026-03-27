import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GuestController } from './guests.controller';
import { GuestService } from './guests.service';

@Module({
  imports: [PrismaModule],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestsModule {}