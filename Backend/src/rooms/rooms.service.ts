import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = await this.prisma.room.create({
      data: createRoomDto,
    });

    await this.prisma.hotel.update({
      where: { id: createRoomDto.hotelId },
      data: {
        totalRooms: {
          increment: 1,
        },
      },
    });

    return room;
  }

  async findAll(hotelId?: string) {
    return this.prisma.room.findMany({
      where: hotelId ? { hotelId } : undefined,
      include: {
        hotel: true,
        bookings: {
          where: {
            status: {
              in: ['CONFIRMED', 'CHECKED_IN'],
            },
          },
        },
      },
    });
  }

  async findAvailableRooms(hotelId: string, checkIn: Date, checkOut: Date) {
    const bookedRooms = await this.prisma.booking.findMany({
      where: {
        hotelId,
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
      select: { roomId: true },
    });

    const bookedRoomIds = bookedRooms.map(b => b.roomId);

    return this.prisma.room.findMany({
      where: {
        hotelId,
        isAvailable: true,
        id: { notIn: bookedRoomIds },
      },
      include: {
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        hotel: true,
        bookings: {
          include: {
            guest: true,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.findOne(id);
    
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    const room = await this.prisma.room.delete({
      where: { id },
    });

    await this.prisma.hotel.update({
      where: { id: room.hotelId },
      data: {
        totalRooms: {
          decrement: 1,
        },
      },
    });

    return room;
  }
}