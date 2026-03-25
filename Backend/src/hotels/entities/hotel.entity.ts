import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from '@prisma/client';

export class HotelEntity implements Hotel {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string | null;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty()
  zipCode!: string;

//   @ApiProperty()
//   rating!: number | null;

//   @ApiProperty()
//   totalRooms!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}