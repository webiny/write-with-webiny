// Path: chat-app/lib/apollo.js

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';

const readURL = new HttpLink({
  uri: process.env.WEBINY_READ_URL,
  headers: {
    Authorization: `Bearer ${process.env.WEBINY_READ_TOKEN}`, //Passing the read token
  },
});

const manageURL = new HttpLink({
  uri: process.env.WEBINY_MANAGE_URL,
  headers: {
    Authorization: `Bearer ${process.env.WEBINY_MANAGE_TOKEN}`, //Passing the manage token
  },
});

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().endpointType === 'manage', //picking the endpoint to use
    manageURL,
    readURL
  ),
  cache: new InMemoryCache(),
});

export default client;
