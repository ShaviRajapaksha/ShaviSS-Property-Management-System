import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) {}

    async create(createPaymentDto: CreatePaymentDto) {
        const payment = await this.prisma.payment.create({
          data: createPaymentDto,
            include: {
                booking: true,
                guest: true,
            }
        });

        await this.prisma.booking.update({
            where: {id: createPaymentDto.bookingId},
            data: {
                status: 'CONFIRMED',
            }
        });
        return payment;
    }

    async findAll(bookingId?: string, guestId?: string) {
        return this.prisma.payment.findMany({
            where: {
                ...(bookingId && { bookingId }),
                ...(guestId && { guestId }),
            },
            include: {
                booking: {
                    include: {
                        guest: true,
                        room: true,
                    }
                },
                guest: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    }

    async findOne(id: string) {
        const payment = await this.prisma.payment.findUnique({
            where: {id},
            include: {
                booking: {
                    include: {
                        guest: true,
                        room: true,
                        hotel: true,
                    }
                },
                guest: true,
            }
        });
        if(!payment) {
            throw new NotFoundException("Payment not found");
        }
        return payment;       
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto) {
        await this.findOne(id);
        
        return this.prisma.payment.update({
        where: { id },
        data: updatePaymentDto,
        include: {
            booking: true,
        },
        });
    }

    async updateStatus(id: string, status: string) {
        await this.findOne(id);
        
        return this.prisma.payment.update({
        where: { id },
        data: { status: status as any },
        include: {
            booking: true,
        },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        
        return this.prisma.payment.delete({
        where: { id },
        });
    }    
}