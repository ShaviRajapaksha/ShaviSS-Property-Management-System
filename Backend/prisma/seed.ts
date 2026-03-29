import { PrismaClient, RoomType, PaymentMethod } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Hotels
  const hotel1 = await prisma.hotel.create({
    data: {
      name: 'Grand Plaza Hotel',
      description: 'Luxury hotel in the heart of the city',
      email: 'contact@grandplaza.com',
      phone: '+1234567890',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      zipCode: '10001',
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: 'Seaside Resort',
      description: 'Beautiful beachfront resort',
      email: 'info@seasideresort.com',
      phone: '+1234567891',
      address: '456 Beach Avenue',
      city: 'Miami',
      country: 'USA',
      zipCode: '33139',
    },
  });

  // Create Rooms for Hotel 1
  const rooms = [
    { roomNumber: '101', type: RoomType.SINGLE, floor: 1, capacity: 1, pricePerNight: 150 },
    { roomNumber: '102', type: RoomType.DOUBLE, floor: 1, capacity: 2, pricePerNight: 200 },
    { roomNumber: '103', type: RoomType.SUITE, floor: 1, capacity: 3, pricePerNight: 350 },
    { roomNumber: '201', type: RoomType.DELUXE, floor: 2, capacity: 2, pricePerNight: 300 },
    { roomNumber: '202', type: RoomType.PRESIDENTIAL, floor: 2, capacity: 4, pricePerNight: 500 },
  ];

  for (const room of rooms) {
    await prisma.room.create({
      data: {
        ...room,
        hotelId: hotel1.id,
      },
    });
  }

  // Create Rooms for Hotel 2
  const rooms2 = [
    { roomNumber: '301', type: RoomType.DOUBLE, floor: 3, capacity: 2, pricePerNight: 250 },
    { roomNumber: '302', type: RoomType.SUITE, floor: 3, capacity: 3, pricePerNight: 400 },
    { roomNumber: '401', type: RoomType.DELUXE, floor: 4, capacity: 2, pricePerNight: 350 },
  ];

  for (const room of rooms2) {
    await prisma.room.create({
      data: {
        ...room,
        hotelId: hotel2.id,
      },
    });
  }

  // Create Guests
  const guest1 = await prisma.guest.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567892',
      address: '789 Oak Street',
      city: 'New York',
      country: 'USA',
      idNumber: 'ID123456',
      nationality: 'American',
    },
  });

  const guest2 = await prisma.guest.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567893',
      address: '321 Pine Avenue',
      city: 'Miami',
      country: 'USA',
      idNumber: 'ID789012',
      nationality: 'American',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });