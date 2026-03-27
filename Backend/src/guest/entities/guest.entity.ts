import { ApiProperty } from '@nestjs/swagger';
import { Guest } from '@prisma/client';

export class GuestEntity implements Guest {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  address!: string | null;

  @ApiProperty()
  city!: string | null;

  @ApiProperty()
  country!: string | null;

  @ApiProperty()
  idNumber!: string | null;

  @ApiProperty()
  nationality!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}