import { ApiProperty } from '@nestjs/swagger';
import { Room, RoomType } from '@prisma/client';

export class RoomEntity implements Room {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  roomNumber!: string;

  @ApiProperty({ enum: RoomType })
  type!: RoomType;

  @ApiProperty()
  floor!: number;

  @ApiProperty()
  capacity!: number;

  @ApiProperty()
  pricePerNight!: number;

  @ApiProperty()
  description!: string | null;

  @ApiProperty()
  isAvailable!: boolean;

  @ApiProperty()
  hotelId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}