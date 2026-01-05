# 🐉 Dragon Challenge - Full Stack E-Commerce Application

A modern full-stack e-commerce application built with NestJS, GraphQL, Next.js, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)

## ✨ Features

### User Management
- ✅ User registration and authentication
- ✅ JWT-based authentication
- ✅ Role-based access control (USER/ADMIN)
- ✅ Secure password hashing with bcrypt

### Product Management
- ✅ Browse all products
- ✅ Search products by name/description
- ✅ Create, update, and delete products (authenticated users)
- ✅ Real-time stock management
- ✅ Product filtering

### Order Management
- ✅ Shopping cart functionality
- ✅ Place orders with multiple products
- ✅ View order history
- ✅ Track order status
- ✅ Search orders by user
- ✅ Automatic stock deduction

## 🛠 Tech Stack

### Backend
- **Framework:** NestJS 10.x
- **API:** GraphQL with Apollo Server
- **Database:** PostgreSQL 15
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator, class-transformer
- **Password Hashing:** bcrypt

### Frontend
- **Framework:** Next.js 14.x (React 18)
- **Styling:** Tailwind CSS 3.x
- **GraphQL Client:** Apollo Client 3.x
- **Language:** TypeScript

### DevOps
- **Containerization:** Docker & Docker Compose
- **Database Management:** pgAdmin 4

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (Next.js + Apollo)                        │
│                  http://localhost:3000                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ GraphQL Queries/Mutations
                       │ (with JWT Authentication)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│                  (NestJS + GraphQL)                          │
│                  http://localhost:3001                       │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Auth      │  │  Products   │  │   Orders    │         │
│  │   Module    │  │   Module    │  │   Module    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└──────────────────────┬──────────────────────────────────────┘
                       │ TypeORM
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│                  http://localhost:5432                       │
│                                                               │
│  ┌────────┐  ┌──────────┐  ┌────────┐  ┌─────────────┐    │
│  │ users  │  │ products │  │ orders │  │ order_items │    │
│  └────────┘  └──────────┘  └────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Docker and Docker Compose
- Git

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd dragon-challenge
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=dragon_user
DATABASE_PASSWORD=dragon_password
DATABASE_NAME=dragon_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Application
PORT=3001
```

#### Frontend (.env.local)
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
```

## 🏃 Running the Application

### Option 1: Using Docker Compose (Recommended)

```bash
# From the root directory
docker-compose up -d
```

This will start:
- PostgreSQL database on `localhost:5432`
- pgAdmin on `localhost:5050`
- Backend API on `localhost:3001`
- Frontend app on `localhost:3000`

### Option 2: Manual Setup

#### 1. Start PostgreSQL

```bash
docker-compose up -d postgres pgadmin
```

#### 2. Start Backend

```bash
cd backend
npm run start:dev
```

The backend will be available at `http://localhost:3001/graphql`

#### 3. Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🗄 Database Schema

See [DATABASE_DIAGRAM.md](./DATABASE_DIAGRAM.md) for the complete database schema diagram.

### Entities Overview

**User**
- id (UUID, PK)
- email (unique)
- password (hashed)
- firstName
- lastName
- role (USER/ADMIN)
- createdAt

**Product**
- id (UUID, PK)
- name
- description
- price (decimal)
- stock (integer)
- imageUrl
- isActive (boolean)
- createdAt
- updatedAt

**Order**
- id (UUID, PK)
- userId (FK → User)
- total (decimal)
- status (PENDING/PROCESSING/COMPLETED/CANCELLED)
- createdAt

**OrderItem**
- id (UUID, PK)
- orderId (FK → Order)
- productId (FK → Product)
- quantity (integer)
- price (decimal, snapshot)
- subtotal (decimal)

## 📚 API Documentation

### GraphQL Playground

Access the GraphQL Playground at `http://localhost:3001/graphql`

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Sample Queries and Mutations

#### Register a User
```graphql
mutation {
  register(registerInput: {
    email: "user@example.com"
    password: "password123"
    firstName: "John"
    lastName: "Doe"
  }) {
    accessToken
    user {
      id
      email
      role
    }
  }
}
```

#### Login
```graphql
mutation {
  login(loginInput: {
    email: "user@example.com"
    password: "password123"
  }) {
    accessToken
    user {
      id
      email
    }
  }
}
```

#### Get Products
```graphql
query {
  products {
    id
    name
    description
    price
    stock
  }
}
```

#### Create Order
```graphql
mutation {
  createOrder(createOrderInput: {
    items: [
      { productId: "product-uuid", quantity: 2 }
    ]
  }) {
    id
    total
    status
    items {
      product {
        name
      }
      quantity
      subtotal
    }
  }
}
```

## 🧪 Testing

```bash
# Backend unit tests
cd backend
npm run test

# Backend e2e tests
npm run test:e2e

# Frontend tests
cd frontend
npm run test
```

## 📁 Project Structure

```
dragon-challenge/
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   │   ├── decorators/    # Custom decorators
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── guards/        # Auth guards
│   │   │   └── strategies/    # JWT strategy
│   │   ├── users/             # Users module
│   │   ├── products/          # Products module
│   │   ├── orders/            # Orders module
│   │   ├── app.module.ts      # Main application module
│   │   └── main.ts            # Application entry point
│   ├── test/                  # E2E tests
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/             # Next.js pages
│   │   │   ├── index.tsx      # Home/redirect page
│   │   │   ├── login.tsx      # Login page
│   │   │   ├── register.tsx   # Register page
│   │   │   ├── dashboard.tsx  # Dashboard page
│   │   │   ├── products.tsx   # Products page
│   │   │   └── orders.tsx     # Orders page
│   │   ├── graphql/           # GraphQL queries/mutations
│   │   ├── lib/               # Apollo client configuration
│   │   └── styles/            # Global styles
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🎯 Technical Decisions

### Why NestJS?
- Built-in support for GraphQL
- Excellent TypeScript support
- Modular architecture
- Built-in dependency injection
- Enterprise-grade framework

### Why GraphQL?
- Flexible data fetching
- Type-safe API
- Reduces over-fetching
- Single endpoint
- Great developer experience with GraphQL Playground

### Why TypeORM?
- TypeScript-first ORM
- Decorator-based entities
- Automatic migrations
- Supports multiple databases
- Active community

### Why Next.js?
- Server-side rendering capabilities
- File-based routing
- Great developer experience
- Optimized production builds
- Built-in TypeScript support

### Why Tailwind CSS?
- Utility-first approach
- Rapid UI development
- Small bundle size
- Consistent design system
- Easy customization

### Authentication Strategy
- JWT tokens for stateless authentication
- Bcrypt for secure password hashing
- Guards for protected routes
- Token stored in localStorage (frontend)

### Database Design Decisions
- UUID for primary keys (better for distributed systems)
- Soft delete for products (isActive flag)
- Price snapshot in OrderItems (preserve historical prices)
- Enum for order status (type safety)
- Proper indexing on frequently queried fields

## 🔐 Security Considerations

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with expiration
- Input validation using class-validator
- SQL injection prevention via TypeORM
- CORS configuration
- Environment variables for sensitive data

## 🚀 Deployment Considerations

### Environment Variables
Always use environment variables for:
- Database credentials
- JWT secrets
- API URLs
- Port numbers

### Production Checklist
- [ ] Change JWT_SECRET to a strong random value
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Use connection pooling for database
- [ ] Enable rate limiting

## 📝 Future Improvements

- [ ] Add pagination for products and orders
- [ ] Implement product categories
- [ ] Add product reviews and ratings
- [ ] Implement payment gateway integration
- [ ] Add email notifications
- [ ] Implement caching (Redis)
- [ ] Add comprehensive unit and e2e tests
- [ ] Implement admin dashboard
- [ ] Add file upload for product images
- [ ] Implement real-time updates with GraphQL subscriptions

## 👨‍💻 Development

### Code Style
- ESLint for linting
- Prettier for code formatting
- Husky for pre-commit hooks

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature
```

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the Dragon Challenge**