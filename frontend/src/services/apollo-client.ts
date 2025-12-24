import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default client;
