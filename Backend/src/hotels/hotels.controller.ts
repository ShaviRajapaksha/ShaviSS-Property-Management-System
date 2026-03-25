import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HotelsService } from "./hotels.service";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { HotelEntity } from "./entities/hotel.entity";
import { UpdateHotelDto } from "./dto/update-hotel.dto";

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelService: HotelsService) {}

    @Post()
    @ApiOperation({summary: 'Create a new hotel'})
    @ApiResponse({status: 201, description: 'The hotel has been successfully created.'})
    create(@Body() CreateHotelDto: CreateHotelDto) {
        return this.hotelService.create(CreateHotelDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all hotels'})
    @ApiResponse({status: 200, type: [HotelEntity]})
    findAll() {
        return this.hotelService.findAll();
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a hotel'})
    @ApiResponse({status: 200, type: HotelEntity})
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateHotelDto: UpdateHotelDto) {
        return this.hotelService.update(id, updateHotelDto);
    }

    @Delete(':id') 
    @ApiOperation({summary: 'Delete a hotel'})
    @ApiResponse({status: 204})
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.hotelService.remove(id);
    }
}