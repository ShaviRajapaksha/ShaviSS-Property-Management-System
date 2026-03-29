# Hotel Property Management System (PMS)

A comprehensive Property Management System for hotels built with modern technologies. This system manages hotels, rooms, guests, bookings, and payments with a clean architecture and full API documentation.

## Features

- **Hotel Management** - Create, update, delete hotels
- **Room Management** - Manage rooms, types, pricing, availability
- **Guest Management** - Guest profiles and history
- **Booking System** - Create reservations with availability checking
- **Payment Processing** - Track payments and status
- **API Documentation** - Swagger/OpenAPI documentation
- **Dashboard** - Analytics and key metrics

## Current Features

- Hotel Management: Create, read, update, and delete hotels
- Room Management: Manage room types, pricing, and availability
- Guest Management: Complete guest profiles and history
- Booking System: Create and manage reservations with date validation
- Payment Processing: Track payments and payment status
- Swagger Documentation: Complete API documentation

## System Architecture

### High-Level Architecture
```txt
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            React SPA (Vite + TypeScript)             │   │
│  │  - Dashboard, Hotels, Rooms, Guests, Bookings,       │   │
│  │    Payments Pages                                    │   │
│  │  - Tailwind CSS for styling                          │   │
│  │  - Axios for API communication                       │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (NestJS)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Gateway Layer                       │   │
│  │  - Controllers (Hotels, Rooms, Guests, Bookings,     │   │
│  │    Payments)                                         │   │
│  │  - Request validation (DTOs)                         │   │
│  │  - Swagger documentation                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Business Logic Layer                    │   │
│  │  - Services with core business rules                 │   │
│  │  - Availability checking                             │   │
│  │  - Payment processing                                │   │
│  │  - Booking validation                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Data Access Layer                       │   │
│  │  - Prisma ORM Service                                │   │
│  │  - Database queries                                  │   │
│  │  - Connection management                             │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ Prisma Client
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                        │
│  Tables: Hotels, Rooms, Guests, Bookings, Payments          │
└─────────────────────────────────────────────────────────────┘
```

## Database Design

### Entity Relationship Diagram
```txt
┌─────────────────┐         ┌─────────────────┐
│     Hotels      │         │     Guests      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ name            │         │ firstName       │
│ description     │         │ lastName        │
│ email (U)       │         │ email (U)       │
│ phone           │         │ phone           │
│ address         │         │ address         │
│ city            │         │ city            │
│ country         │         │ country         │
│ rating          │         │ idNumber (U)    │
│ totalRooms      │         │ nationality     │
└────────┬────────┘         └────────┬────────┘
         │ 1                          │ 1
         │                            │
         │ has many                   │ has many
         │                            │
         ▼                            ▼
┌─────────────────┐         ┌─────────────────┐
│      Rooms      │         │    Bookings     │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │◄────────│ id (PK)         │
│ roomNumber      │         │ checkInDate     │
│ type (ENUM)     │         │ checkOutDate    │
│ floor           │         │ totalPrice      │
│ capacity        │         │ status (ENUM)   │
│ pricePerNight   │         │ numberOfGuests  │
│ hotelId (FK)    │         │ guestId (FK)    │
└─────────────────┘         │ roomId (FK)     │
                            │ hotelId (FK)    │
                            └────────┬────────┘
                                     │ 1
                                     │
                                     │ has one
                                     │
                                     ▼
                            ┌─────────────────┐
                            │    Payments     │
                            ├─────────────────┤
                            │ id (PK)         │
                            │ amount          │
                            │ method (ENUM)   │
                            │ status (ENUM)   │
                            │ bookingId (FK)  │
                            │ guestId (FK)    │
                            └─────────────────┘
```

## Tech Stack

### Backend - Completed
- NestJS 10.x
- TypeScript 5.x
- Prisma 7.x (ORM)
- PostgreSQL 14+
- Swagger/OpenAPI

### Frontend - Ongoing
- React 18.x
- TypeScript 5.x
- Vite 4.x
- Tailwind CSS 3.x
- React Router 6.x
- Axios
- Recharts

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Project Structure
```txt
hotel-pms/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── prisma/            # Database service
│   │   ├── hotels/            # Hotels module
│   │   ├── rooms/             # Rooms module
│   │   ├── guests/            # Guests module
│   │   ├── bookings/          # Bookings module
│   │   └── payments/          # Payments module
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts           # Seed data
│   └── package.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── api/               # API client
    │   ├── types/             # TypeScript types
    │   ├── components/        # Reusable components
    │   └── pages/             # Page components
    │       ├── Dashboard.tsx
    │       ├── Hotels.tsx
    │       ├── Rooms.tsx
    │       ├── Guests.tsx
    │       ├── Bookings.tsx
    │       └── Payments.tsx
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

## API Documentation
Once backend is running, access Swagger documentation at:
```txt
http://localhost:3000/api/docs
```

## Database Schema
### Core Tables
- Hotel - Hotel information and details
- Room - Room types, pricing, availability
- Guest - Guest profiles and contact info
- Booking - Reservation records
- Payment - Payment transactions

### Relationships
- Hotel → Rooms (One-to-Many)
- Hotel → Bookings (One-to-Many)
- Room → Bookings (One-to-Many)
- Guest → Bookings (One-to-Many)
- Booking → Payment (One-to-One)

## Environment Variables
### Backend (.env)
```txt
DATABASE_URL="postgresql://postgres:password@localhost:5432/hotel_pms?schema=public"
PORT=3000
```

## Installation Guide

### Backend Setup
```txt
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create database
psql -U postgres -c "CREATE DATABASE hotel_pms;"

# Run Prisma migrations
npx prisma migrate dev --name init

# Seed database
npm run prisma:seed

# Start development server
npm run start:dev
```
## Backend Screenshots
<table>
 <tr>
 <td>
<img width="1280" height="302" alt="Screenshot 2026-03-29 at 14 28 42" src="https://github.com/user-attachments/assets/caa741b7-7c0a-4a12-81d7-262f60d8c3a7" />
 </td>
 </tr>
 <tr>
 <td>
<img width="1280" height="386" alt="Screenshot 2026-03-29 at 14 28 50" src="https://github.com/user-attachments/assets/2d74e990-2063-4326-9137-dcc5eec5a9b2" />
 </td>
 </tr>
  <tr>
 <td>
<img width="1280" height="336" alt="Screenshot 2026-03-29 at 14 28 57" src="https://github.com/user-attachments/assets/7a68dbb3-64ea-4884-9e0c-5cb7af52837b" />
 </td>
 </tr>
   <tr>
 <td>
<img width="1280" height="442" alt="Screenshot 2026-03-29 at 14 29 04" src="https://github.com/user-attachments/assets/9c6397de-2ab4-4c99-9aec-49eacd6fe055" />
 </td>
 </tr>
   <tr>
 <td>
<img width="1280" height="389" alt="Screenshot 2026-03-29 at 14 29 11" src="https://github.com/user-attachments/assets/f4dfc322-0d02-427e-8fe8-cb990981868f" />
 </td>
 </tr>
</table>

