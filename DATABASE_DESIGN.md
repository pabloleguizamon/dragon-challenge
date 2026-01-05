# 🗄️ Database Schema Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USERS TABLE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ PK │ id              │ UUID                                              │
│    │ email           │ VARCHAR(255) UNIQUE NOT NULL                      │
│    │ password        │ VARCHAR(255) NOT NULL (hashed with bcrypt)        │
│    │ firstName       │ VARCHAR(255)                                      │
│    │ lastName        │ VARCHAR(255)                                      │
│    │ role            │ ENUM('USER', 'ADMIN') DEFAULT 'USER'              │
│    │ createdAt       │ TIMESTAMP DEFAULT NOW()                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │
                                    │ *
┌─────────────────────────────────────────────────────────────────────────┐
│                             ORDERS TABLE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ PK │ id              │ UUID                                              │
│ FK │ userId          │ UUID NOT NULL → users.id                          │
│    │ total           │ DECIMAL(10,2) NOT NULL                            │
│    │ status          │ ENUM('PENDING','PROCESSING',                      │
│    │                 │      'COMPLETED','CANCELLED')                     │
│    │                 │ DEFAULT 'PENDING'                                 │
│    │ createdAt       │ TIMESTAMP DEFAULT NOW()                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │
                                    │ *
┌─────────────────────────────────────────────────────────────────────────┐
│                          ORDER_ITEMS TABLE                               │
├─────────────────────────────────────────────────────────────────────────┤
│ PK │ id              │ UUID                                              │
│ FK │ orderId         │ UUID NOT NULL → orders.id (CASCADE)               │
│ FK │ productId       │ UUID NOT NULL → products.id                       │
│    │ quantity        │ INTEGER NOT NULL                                  │
│    │ price           │ DECIMAL(10,2) NOT NULL (price snapshot)           │
│    │ subtotal        │ DECIMAL(10,2) NOT NULL                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ *
                                    │
                                    │
                                    │ 1
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRODUCTS TABLE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ PK │ id              │ UUID                                              │
│    │ name            │ VARCHAR(255) NOT NULL                             │
│    │ description     │ TEXT NOT NULL                                     │
│    │ price           │ DECIMAL(10,2) NOT NULL                            │
│    │ stock           │ INTEGER DEFAULT 0                                 │
│    │ imageUrl        │ VARCHAR(500) NULLABLE                             │
│    │ isActive        │ BOOLEAN DEFAULT TRUE                              │
│    │ createdAt       │ TIMESTAMP DEFAULT NOW()                           │
│    │ updatedAt       │ TIMESTAMP DEFAULT NOW()                           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Relationships

### User → Orders (One-to-Many)
- **Relationship:** One user can have multiple orders
- **Foreign Key:** `orders.userId` references `users.id`
- **Cardinality:** 1:N
- **Delete Behavior:** Restrict (cannot delete user with existing orders)

### Order → OrderItems (One-to-Many)
- **Relationship:** One order contains multiple order items
- **Foreign Key:** `order_items.orderId` references `orders.id`
- **Cardinality:** 1:N
- **Delete Behavior:** Cascade (deleting order deletes all order items)

### Product → OrderItems (One-to-Many)
- **Relationship:** One product can appear in multiple order items
- **Foreign Key:** `order_items.productId` references `products.id`
- **Cardinality:** 1:N
- **Delete Behavior:** Restrict (cannot delete product referenced in orders)

## Indexes

### Users Table
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Products Table
```sql
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_isActive ON products(isActive);
CREATE INDEX idx_products_price ON products(price);
```

### Orders Table
```sql
CREATE INDEX idx_orders_userId ON orders(userId);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_createdAt ON orders(createdAt DESC);
```

### OrderItems Table
```sql
CREATE INDEX idx_orderitems_orderId ON order_items(orderId);
CREATE INDEX idx_orderitems_productId ON order_items(productId);
```

## Data Types Explained

### UUID (Universally Unique Identifier)
- Used for all primary keys
- Benefits:
  - Globally unique across tables and databases
  - Better for distributed systems
  - Prevents enumeration attacks
  - No auto-increment collisions

### DECIMAL(10,2)
- Used for monetary values (price, total, subtotal)
- 10 total digits, 2 after decimal point
- Prevents floating-point arithmetic errors
- Example: 99999999.99

### ENUM
- Used for fixed set of values
- **UserRole:** USER, ADMIN
- **OrderStatus:** PENDING, PROCESSING, COMPLETED, CANCELLED
- Database-level constraint
- Type-safe in TypeScript

### TIMESTAMP
- Stores date and time with timezone
- Automatically managed by TypeORM
- `createdAt`: Set once on insert
- `updatedAt`: Updated on every modification

## Business Rules

### User
1. Email must be unique across all users
2. Password must be hashed before storage (bcrypt with 10 rounds)
3. Role defaults to 'USER' on registration
4. Cannot be deleted if has existing orders

### Product
5. Price must be greater than or equal to 0
6. Stock must be greater than or equal to 0
7. Soft delete using `isActive` flag (prevents data loss)
8. `updatedAt` timestamp tracks last modification

### Order
9. Total is calculated as sum of all order items subtotals
10. Status starts as 'PENDING'
11. Cannot be deleted (business requirement for audit trail)
12. Each order belongs to exactly one user

### OrderItem
13. Price is a snapshot at time of order (preserves historical pricing)
14. Subtotal = price × quantity
15. Quantity must be greater than 0
16. When order is placed, product stock is reduced
17. Cascade delete with parent order

## Sample Data

### Users
```sql
INSERT INTO users (id, email, password, firstName, lastName, role, createdAt)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 
   'admin@dragon.com', 
   '$2b$10$hashed_password', 
   'Admin', 
   'User', 
   'ADMIN', 
   NOW());
```

### Products
```sql
INSERT INTO products (id, name, description, price, stock, isActive, createdAt, updatedAt)
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001',
   'Dragon Sword',
   'A legendary sword forged by dragons',
   299.99,
   10,
   TRUE,
   NOW(),
   NOW());
```

### Orders
```sql
INSERT INTO orders (id, userId, total, status, createdAt)
VALUES 
  ('750e8400-e29b-41d4-a716-446655440002',
   '550e8400-e29b-41d4-a716-446655440000',
   599.98,
   'COMPLETED',
   NOW());
```

### OrderItems
```sql
INSERT INTO order_items (id, orderId, productId, quantity, price, subtotal)
VALUES 
  ('850e8400-e29b-41d4-a716-446655440003',
   '750e8400-e29b-41d4-a716-446655440002',
   '650e8400-e29b-41d4-a716-446655440001',
   2,
   299.99,
   599.98);
```

## Database Normalization

This schema follows **Third Normal Form (3NF)**:

### First Normal Form (1NF)
✅ All columns contain atomic values
✅ Each row is unique (UUID primary keys)
✅ No repeating groups

### Second Normal Form (2NF)
✅ All non-key attributes depend on the entire primary key
✅ No partial dependencies

### Third Normal Form (3NF)
✅ No transitive dependencies
✅ All attributes depend only on the primary key

## Query Performance Considerations

### Optimized Queries
1. **Get user's orders with items:**
   - Uses indexes on `orders.userId` and `order_items.orderId`
   - Eager loading prevents N+1 queries

2. **Search products:**
   - Index on `products.name` for LIKE queries
   - Index on `products.isActive` for filtering

3. **Order history:**
   - Index on `orders.createdAt DESC` for chronological sorting
   - Composite index possible for userId + createdAt

### TypeORM Relations
```typescript
// Efficient eager loading
{
  relations: ['items', 'items.product', 'user']
}
```

## Migration Strategy

TypeORM handles migrations automatically with `synchronize: true` in development.

For production:
```bash
npm run migration:generate -- -n CreateInitialSchema
npm run migration:run
```

## Backup Strategy

### Recommended Approach
1. Daily automated backups
2. Point-in-time recovery enabled
3. Backup retention: 30 days
4. Test restore procedure monthly

```bash
# Backup command
pg_dump -U dragon_user -d dragon_db > backup_$(date +%Y%m%d).sql

# Restore command
psql -U dragon_user -d dragon_db < backup_20250103.sql
```

## Scaling Considerations

### Read Replicas
- Separate read/write connections
- Read-heavy queries to replicas
- Master for writes only

### Partitioning
- Orders table can be partitioned by date
- Improves query performance for historical data

### Connection Pooling
```typescript
// TypeORM config
{
  extra: {
    max: 20,           // Maximum pool size
    min: 5,            // Minimum pool size
    idleTimeoutMillis: 30000
  }
}
```

---

**Database Version:** PostgreSQL 15
**ORM:** TypeORM 0.3.x
**Last Updated:** January 2026