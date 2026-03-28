import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Min } from "class-validator";
import { IsDateString } from "class-validator/types/decorator/string/IsDateString";

export class CreateBookingDto {
    @ApiProperty()
    @IsDateString()
    checkInDate!: Date;

    @ApiProperty()
    @IsDateString()
    checkOutDate!: Date;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    totalPrice!: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    numberOfGuests!: number;

    @ApiProperty()
    @IsString()
    guestId!: string;

    @ApiProperty()
    @IsString()
    roomId!: string;
    
    @ApiProperty()
    @IsString()
    hotelId!: string;
}