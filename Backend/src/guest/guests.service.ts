import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateGuestDto } from "./dto/update-guest.dto";

@Injectable()
export class GuestService {
    constructor(private prisma: PrismaService) {} 

    async create(createGuestDto: CreateGuestDto) {
        return this.prisma.guest.create({
            data: createGuestDto,
        })
    }

    async findAll() {
        return this.prisma.guest.findMany({
            include: {
                booking: {
                    include: {
                        room: true,
                        hotel: true,
                    }
                }
            }
        });
    }

    async findOne(id: string) {
        const guest = await this.prisma.guest.findUnique({
            where: {id},
            include: {
                booking: {
                    include: {
                        hotel: true,
                        payment: true
                    }
                },
                payment: true
            }
        });
        if(!guest) {
            throw new NotFoundException("Guest not found");
        }
        return guest;
    }

    async update(id: string, updateGuestDto: UpdateGuestDto) {
        await this.findOne(id);

        return this.prisma.guest.update({
            where: {id},
            data: updateGuestDto,
        })
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.guest.delete({
            where: {id},
        })
    }


}