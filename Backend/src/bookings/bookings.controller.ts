import { Body, Controller, Get, Param, Post, Query, Patch, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingEntity } from "./entities/booking.entity";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
    constructor (private readonly bookingsService: BookingsService) {}

    @Post()
    @ApiOperation({summary: 'Create a new booking'})
    @ApiResponse({status: 201, type: 'BookingEntity'})
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: 200, type: [BookingEntity] })
    findAll(@Query('hotelId') hotelId?: string, @Query('guestId') guestId?: string) {
        return this.bookingsService.findAll(hotelId, guestId);
    }

    @Get('hotel/:hotelId/date-range')
    @ApiOperation({ summary: 'Get bookings by date range' })
    findByDateRange(
        @Param('hotelId') hotelId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.bookingsService.findByDateRange(hotelId, new Date(startDate), new Date(endDate));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a booking by id' })
    @ApiResponse({ status: 200, type: BookingEntity })
    findOne(@Param('id') id: string) {
        return this.bookingsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a booking' })
    @ApiResponse({ status: 200, type: BookingEntity })
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingsService.update(id, updateBookingDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update booking status' })
    @ApiResponse({ status: 200, type: BookingEntity })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ) {
        return this.bookingsService.updateStatus(id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a booking' })
    @ApiResponse({ status: 204 })
    remove(@Param('id') id: string) {
        return this.bookingsService.remove(id);
    }
    }    
