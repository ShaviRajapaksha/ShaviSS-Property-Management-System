import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Booking, BookingStatus } from "@prisma/client";

export class BookingEntity implements Booking {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    checkInDate!: Date;

    @ApiProperty()
    checkOutDate!: Date;

    @ApiProperty()
    totalPrice!: number;

    @ApiProperty({ enum: BookingStatus })
    status!: BookingStatus;

    @ApiProperty()
    numberOfGuests!: number;

    @ApiProperty()
    specialRequests!: string | null;

    @ApiProperty()
    guestId!: string;

    @ApiProperty()
    roomId!: string;

    @ApiProperty()
    hotelId!: string;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

}