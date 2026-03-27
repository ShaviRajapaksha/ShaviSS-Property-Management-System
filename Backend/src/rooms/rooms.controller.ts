import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { RoomEntity } from "./entities/room.entity";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new room' })
    @ApiResponse({status: 201, type: RoomEntity})
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all rooms'})
    @ApiResponse({status: 200, type: [RoomEntity]})
    findAll(@Query('hotelId') hotelId?: string) {
        return this.roomsService.findAll(hotelId);
    }

    @Get('available')
    @ApiOperation({summary: 'Get available rooms for a hotel within a date range'})
    async getAvailableRooms(
        @Query('hotelId') hotelId: string,
        @Query('checkIn') checkIn: string,
        @Query('checkOut') checkOut: string,
        ) {
            return this.roomsService.findAvailableRooms(hotelId, new Date(checkIn), new Date(checkOut));
        }
    
    @Get(':id')
    @ApiOperation({summary: 'Get a room by ID'})
    @ApiResponse({status: 200, type: RoomEntity})
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a room'})
    @ApiResponse({status: 200, type: RoomEntity})
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    } 

    @Delete(':id')
    @ApiOperation({summary: 'Delete a room'})
    @ApiResponse({status: 204})
    remove(@Param('id') id: string) {
        return this.roomsService.remove(id);
    }
}