# Backend API Documentation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Database Setup

```bash
# Run migrations
npm run migration:run

# Generate new migration (if needed)
npm run migration:generate -- -n CreateUsersTable
```

### Development

```bash
# Start development server
npm run start:dev

# Server runs on http://localhost:3001
# GraphQL Playground: http://localhost:3001/graphql
```

---

## 📊 Project Structure

```
src/
├── auth/                 # Authentication logic
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── guards/
│   ├── strategies/
│   └── dto/
├── users/               # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.resolver.ts
│   ├── user.entity.ts
│   └── dto/
├── products/           # Product management
│   ├── products.module.ts
│   ├── products.service.ts
│   ├── products.resolver.ts
│   ├── product.entity.ts
│   └── dto/
├── orders/            # Order management
│   ├── orders.module.ts
│   ├── orders.service.ts
│   ├── orders.resolver.ts
│   ├── order.entity.ts
│   └── dto/
├── common/            # Shared utilities
│   ├── exceptions/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── app.module.ts
└── main.ts
```

---

## 🔐 Authentication

### JWT Strategy
- Tokens are issued upon successful login
- Token expires in 1 hour (configurable)
- Protected routes require valid JWT in Authorization header

### Example GraphQL Query

```graphql
mutation Login {
  login(input: { email: "user@example.com", password: "password123" }) {
    access_token
    user {
      id
      email
      firstName
    }
  }
}
```

---

## 📝 GraphQL Schema

### User Type
```graphql
type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  role: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Product Type
```graphql
type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  stock: Int!
  sku: String
  category: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Order Type
```graphql
type Order {
  id: ID!
  user: User!
  items: [OrderItem!]!
  total: Float!
  status: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

---

## 🛠️ Common Tasks

### Create a New Module

```bash
nest g resource products
```

### Generate TypeORM Entity

```bash
nest g class users/user.entity --flat
```

### Format Code

```bash
npm run format
npm run lint
```

---

## 📦 Deployment

1. Build the application:
```bash
npm run build
```

2. Run in production:
```bash
npm run start:prod
```

---

## 🔧 Configuration

All configuration is managed via environment variables. See `.env.example` for available options.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `CORS_ORIGIN`: Allowed CORS origins
- `NODE_ENV`: Environment (development/production)
