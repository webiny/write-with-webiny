import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_WEBINY_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers : {
    Authorization : `Bearer ${process.env.REACT_APP_WEBINY_GRAPHQL_TOKEN}`
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
