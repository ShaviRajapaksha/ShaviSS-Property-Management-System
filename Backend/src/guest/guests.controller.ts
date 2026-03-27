import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GuestService } from "./guests.service";
import { GuestEntity } from "./entities/guest.entity";
import { CreateGuestDto } from "./dto/create-guest.dto";

@ApiTags('guests')
@Controller('guests')
export class GuestController {
    constructor (private readonly guestService: GuestService) {}

    @Post()
    @ApiOperation({summary: 'Create a new guest'})
    @ApiResponse({status: 201, type: GuestEntity})
    create(@Body() createGuestDto: CreateGuestDto) {
        return this.guestService.create(createGuestDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all guests'})
    @ApiResponse({status: 200, type: [GuestEntity]})
    findAll() {
        return this.guestService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get a guest by ID'})
    @ApiResponse({status: 200, type: GuestEntity})
    findOne(@Param('id') id: string) {
        return this.guestService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a guest by ID'})
    @ApiResponse({status: 200, type: GuestEntity})
    update(@Param('id') id: string, @Body() updateGuestDto: CreateGuestDto) {
        return this.guestService.update(id, updateGuestDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a guest by ID'})
    @ApiResponse({status: 204, type: GuestEntity})
    remove(@Param('id') id: string) {
        return this.guestService.remove(id);
    }

}