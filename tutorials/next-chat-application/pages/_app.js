// Path: chat-app/pages/_app.js

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
