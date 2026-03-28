import { ApiProperty } from '@nestjs/swagger';
import { Payment, PaymentMethod, PaymentStatus } from '@prisma/client';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ enum: PaymentMethod })
  method!: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus })
  status!: PaymentStatus;

  @ApiProperty()
  transactionId!: string | null;

  @ApiProperty()
  bookingId!: string;

  @ApiProperty()
  guestId!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}