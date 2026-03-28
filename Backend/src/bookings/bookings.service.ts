import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const { roomId, checkInDate, checkOutDate } = createBookingDto;
    
    const isAvailable = await this.checkRoomAvailability(roomId, checkInDate, checkOutDate);
    
    if (!isAvailable) {
      throw new BadRequestException('Room is not available for the selected dates');
    }
    
    const booking = await this.prisma.booking.create({
      data: createBookingDto,
      include: {
        guest: true,
        room: true,
        hotel: true,
      },
    });
    
    return booking;
  }

  async findAll(hotelId?: string, guestId?: string) {
    return this.prisma.booking.findMany({
      where: {
        ...(hotelId && { hotelId }),
        ...(guestId && { guestId }),
      },
      include: {
        guest: true,
        room: true,
        hotel: true,
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByDateRange(hotelId: string, startDate: Date, endDate: Date) {
    return this.prisma.booking.findMany({
      where: {
        hotelId,
        OR: [
          {
            AND: [
              { checkInDate: { gte: startDate } },
              { checkInDate: { lte: endDate } },
            ],
          },
          {
            AND: [
              { checkOutDate: { gte: startDate } },
              { checkOutDate: { lte: endDate } },
            ],
          },
        ],
      },
      include: {
        guest: true,
        room: true,
        payment: true,
      },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        guest: true,
        room: true,
        hotel: true,
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    await this.findOne(id);
    
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
      include: {
        guest: true,
        room: true,
        hotel: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);
    
    return this.prisma.booking.update({
      where: { id },
      data: { status: status as any },
      include: {
        guest: true,
        room: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prisma.booking.delete({
      where: { id },
    });
  }

  private async checkRoomAvailability(roomId: string, checkIn: Date, checkOut: Date) {
    const conflictingBookings = await this.prisma.booking.findMany({
      where: {
        roomId,
        status: { in: ['CONFIRMED', 'CHECKED_IN'] },
        OR: [
          {
            AND: [
              { checkInDate: { lte: checkOut } },
              { checkOutDate: { gte: checkIn } },
            ],
          },
        ],
      },
    });

    return conflictingBookings.length === 0;
  }
}