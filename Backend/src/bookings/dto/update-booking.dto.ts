import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({ enum: BookingStatus, required: false })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}