import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [PrismaModule, HotelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
