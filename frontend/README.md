# Frontend Application Documentation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure the API endpoint:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/graphql
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── _app.tsx           # App wrapper with Apollo Provider
│   ├── index.tsx          # Home page
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── products/
│   │   ├── index.tsx      # Product listing
│   │   └── [id].tsx       # Product details
│   └── orders/
│       ├── index.tsx      # Order history
│       └── [id].tsx       # Order details
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── OrderList.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── Layout.tsx
├── services/
│   ├── apollo-client.ts   # Apollo Client config
│   ├── graphql/
│   │   ├── queries.ts
│   │   └── mutations.ts
│   └── auth.ts            # Auth utilities
├── styles/
│   └── globals.css        # Tailwind CSS imports
├── pages/_app.tsx
└── pages/index.tsx
```

---

## 🎨 Components

### Key Components

#### Layout Component
Wraps pages with header, sidebar, and footer

```tsx
import Layout from '@/components/Layout';

export default function Page() {
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  );
}
```

#### Product Card
Displays individual product with add to cart button

#### Order List
Shows user's order history with filtering

---

## 🔐 Authentication

### Login Flow
1. User enters credentials
2. Send GraphQL mutation to backend
3. Store JWT token in localStorage
4. Redirect to dashboard
5. Use token in Apollo Client middleware

### Protected Routes

```tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
```

---

## 📡 GraphQL Integration

### Apollo Client Setup

```tsx
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
```

### Example Query

```tsx
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      stock
    }
  }
`;

export default function Products() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

---

## 🛠️ Development

### Format Code
```bash
npm run format
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Build
```bash
npm run build
npm start
```

---

## 📦 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
```
NEXT_PUBLIC_API_URL=https://api.example.com/graphql
```

---

## 🎯 Features Implementation Guide

### Adding a New Page

1. Create file in `src/pages/`
2. Import Layout component
3. Add TypeScript types
4. Implement with Tailwind CSS

```tsx
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';

interface Props {
  data: any;
}

export default function NewPage({ data }: Props) {
  return (
    <Layout>
      <h1>New Page</h1>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { data: {} },
  };
};
```

### Styling with Tailwind CSS

Uses utility-first CSS for rapid development:

```tsx
<div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
  <h2 className="text-xl font-semibold">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Button
  </button>
</div>
```

---

## 🚨 Troubleshooting

### CORS Issues
Ensure backend CORS is configured to allow frontend origin

### Apollo Cache Issues
Clear cache on login/logout:
```tsx
client.clearStore();
```

### Token Not Persisting
Check localStorage and authentication context implementation
