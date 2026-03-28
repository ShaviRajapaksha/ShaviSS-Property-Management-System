import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsString, Min } from "class-validator";

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