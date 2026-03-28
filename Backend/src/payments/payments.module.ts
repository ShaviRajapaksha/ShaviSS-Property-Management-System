import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}