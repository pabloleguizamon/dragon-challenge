# 🐉 DRAGON CHALLENGE

A full-stack e-commerce application for ACME startup to sell products online.

## 🎯 Main Goal

Assess the candidate's ability to architect a scalable solution, implement both frontend and backend features, manage authentication, design efficient data models, and build a clean UI/UX.

## 📋 Business Context

Design and implement a full-stack application that allows users to browse and purchase products. ACME is a startup looking to sell products online. Build this application from scratch, designing both the frontend and backend, including the database.

## ✨ Required Features

### Users
- Sign up / Login
- JWT authentication

### Products
- List all products
- Create, update, delete products (Admin)
- Search and filter products

### Orders
- Authenticated users can place orders
- View user's order history
- Search orders by user

---

## 🛠️ Development Tasks

### Backend (NestJS + GraphQL)
- [ ] Implement a GraphQL API using Apollo Server
- [ ] Define schemas/types for Users, Products, and Orders
- [ ] Implement JWT authentication with guards for protected operations
- [ ] Validate data using DTOs and Pipes
- [ ] Implement middleware for logging or metrics
- [ ] Complete CRUD for Products
- [ ] Design database schema with ORM (TypeORM/Prisma)
- [ ] Unit test implementation
- [ ] Functional Dockerfile

### Frontend (Next.js + React)
- [ ] Implement authentication flow (login/register with JWT)
- [ ] Build views to display products and orders
- [ ] Allow users to browse all products
- [ ] Allow users to search orders by user
- [ ] Use Apollo Client to fetch data from GraphQL API
- [ ] Implement product filtering and pagination (Bonus)
- [ ] Responsive UI/UX design

### Database (PostgreSQL + ORM)
- [ ] Efficient modeling (User, Product, Order entities)
- [ ] Well-defined relationships (OneToMany, ManyToMany)
- [ ] Indexes on searchable fields
- [ ] Migrations setup

### DevOps & Quality
- [ ] Functional docker-compose.yml
- [ ] Linter, Prettier, and Husky configured (Bonus)
- [ ] Unit tests with >80% coverage

---

## 📁 Project Structure

```
dragon-challenge/
├── backend/                 # NestJS GraphQL API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── common/
│   │   └── main.ts
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── frontend/                # Next.js React Application
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── docker-compose.yml       # Container orchestration
├── README.md               # This file
└── DATABASE_DESIGN.md      # Database schema diagram
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)
- Git

### Setup with Docker

```bash
# Clone the repository
git clone <repository-url>
cd dragon-challenge

# Build and run with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# GraphQL Playground: http://localhost:3001/graphql
```

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm run typeorm migration:run
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📖 API Documentation

### GraphQL Endpoints
- **Playground**: `http://localhost:3001/graphql`

### Authentication
- Login endpoint: `/auth/login`
- Register endpoint: `/auth/register`
- Protected routes require JWT token in Authorization header

---

## 🗄️ Database Schema

See [DATABASE_DESIGN.md](DATABASE_DESIGN.md) for detailed schema design and ERD.

### Key Entities
- **User**: id, email, password, firstName, lastName, createdAt, updatedAt
- **Product**: id, name, description, price, stock, createdAt, updatedAt
- **Order**: id, userId, createdAt, updatedAt
- **OrderItem**: id, orderId, productId, quantity, price

---

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected GraphQL mutations
- Input validation with DTOs
- CORS configuration
- Rate limiting (optional)

---

## 📊 Code Quality

- ESLint configuration
- Prettier code formatting
- Husky pre-commit hooks
- Unit tests with Jest
- Test coverage reports

---

## 📝 Technical Decisions

### Backend
- **Framework**: NestJS - for scalability and architecture
- **API**: GraphQL with Apollo Server - for flexible queries
- **Database**: PostgreSQL with TypeORM - strong typing and migrations
- **Authentication**: JWT - stateless and scalable

### Frontend
- **Framework**: Next.js - SSR/SSG capabilities
- **State Management**: Apollo Client cache
- **Styling**: TailwindCSS or styled-components

### Database
- PostgreSQL for reliability and features
- TypeORM for ORM with migrations
- Proper indexing on frequently queried fields

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests (if configured)
cd frontend
npm run test
```

---

## 📦 Deployment

Refer to individual backend and frontend documentation for deployment strategies.

---

## 👤 Author

[Your Name/Team]

## 📄 License

MIT
