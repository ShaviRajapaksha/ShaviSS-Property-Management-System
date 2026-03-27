import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { GuestsModule } from './guest/guests.module';

@Module({
  imports: [PrismaModule, HotelsModule, RoomsModule, GuestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
