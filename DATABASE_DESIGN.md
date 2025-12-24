# Database Design Documentation

## 🗄️ Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│     Users       │        │    Products      │        │     Orders      │
├─────────────────┤        ├──────────────────┤        ├─────────────────┤
│ id (PK)         │◄───────│                  │◄───────│ id (PK)         │
│ email (UNIQUE)  │    1:N │                  │    1:N │ userId (FK)     │
│ password        │        │                  │        │ createdAt       │
│ firstName       │        │                  │        │ updatedAt       │
│ lastName        │        │                  │        │ total           │
│ createdAt       │        │                  │        │ status          │
│ updatedAt       │        │                  │        │                 │
└─────────────────┘        └──────────────────┘        └─────────────────┘
                                    ▲
                                    │
                                    │ M:N
                                    │
                           ┌─────────────────┐
                           │  OrderItems     │
                           ├─────────────────┤
                           │ id (PK)         │
                           │ orderId (FK)    │
                           │ productId (FK)  │
                           │ quantity        │
                           │ price           │
                           └─────────────────┘
```

---

## 📊 Table Definitions

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'USER', -- USER, ADMIN
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
```

### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### OrderItems Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

---

## 🔑 Key Relationships

### One-to-Many (Users → Orders)
- One user can have multiple orders
- Foreign key: `orders.user_id` references `users.id`
- Cascade delete: Orders are deleted when user is deleted

### Many-to-Many (Products ← OrderItems → Orders)
- Products and Orders are related through OrderItems
- Prevents data duplication and provides order history tracking
- Price is stored in OrderItems to preserve historical pricing

---

## 📈 Indexing Strategy

| Table | Column | Type | Reason |
|-------|--------|------|--------|
| users | email | UNIQUE | Fast login lookups |
| users | role | INDEX | Query filtering by role |
| products | name | INDEX | Product search |
| products | category | INDEX | Browse by category |
| products | is_active | INDEX | Filter active products |
| orders | user_id | INDEX | User order history |
| orders | status | INDEX | Query by order status |
| orders | created_at | INDEX | Sort by creation date |
| order_items | order_id | INDEX | Retrieve order items |
| order_items | product_id | INDEX | Product in order lookups |

---

## 🔐 Data Integrity Constraints

1. **NOT NULL Constraints**: Essential fields (email, password, name, price, stock)
2. **UNIQUE Constraints**: Email on Users, SKU on Products
3. **FOREIGN KEY Constraints**: Maintain referential integrity
4. **CASCADE DELETE**: Automatically clean up related data
5. **DEFAULT Values**: Status defaults, timestamps auto-set

---

## 🎯 Normalization

- **3NF Applied**: Entities are in third normal form
- **No Redundant Data**: Relationships properly separated
- **Atomic Values**: All fields contain single values
- **Historical Data**: OrderItems preserve pricing history

---

## 📝 Migration Strategy

Migrations are handled using NestJS + TypeORM with the following conventions:
- Timestamp-based migration names
- Up/Down migration support
- Automatic seed data for testing
