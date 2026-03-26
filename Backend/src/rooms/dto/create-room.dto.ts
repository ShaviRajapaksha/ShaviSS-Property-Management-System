import { ApiProperty } from "@nestjs/swagger";
import { RoomType } from "@prisma/client";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    roomNumber!: string;

    @ApiProperty({ enum: ['SINGLE', 'DOUBLE', 'TWIN', 'SUITE', 'DELUXE', 'PRESIDENTIAL'] })
//  @ApiProperty({ enum: RoomType })    
    @IsEnum(RoomType)
    type!: RoomType;

    @ApiProperty()
    @IsInt()
    @Min(1)
    floor!: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    capacity!: number;    

    @ApiProperty()
    @IsNumber()
    @Min(0)
    pricePerNight!: number;

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsString()
    hotelId!: string;
}

