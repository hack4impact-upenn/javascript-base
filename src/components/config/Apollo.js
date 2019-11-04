import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch"

const link = createHttpLink({ uri: '/api', fetch: fetch })

const client = new ApolloClient({
  link: link,
  credentials: 'include',
  cache: new InMemoryCache()
});

export default client;