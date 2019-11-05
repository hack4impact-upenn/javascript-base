import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error'
import { ApolloLink } from "apollo-boost"
import fetch from "node-fetch"
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({ uri: '/api', fetch: fetch })
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  credentials: 'include',
  cache: new InMemoryCache()
});

export default client;