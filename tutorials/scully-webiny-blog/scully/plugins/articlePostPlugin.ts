import {
  ApolloClient,
  ApolloLink,
  concat,
  gql,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import fetch from 'node-fetch';
import { HandledRoute, registerPlugin } from '@scullyio/scully';
import { environment } from '../../src/environments/environment';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${environment.webiny.GRAPHQL_API_TOKEN}`,
    },
  });
  return forward(operation);
});
const client = new ApolloClient({
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: environment.webiny.GRAPHQL_API_URL,
      fetch,
    })
  ),
  cache: new InMemoryCache(),
});
registerPlugin(
  'router',
  'articlePostPlugin',
  async (route: string, config = {}): Promise<HandledRoute[]> => {
    const {
      data: { listArticlePosts },
    } = await client.query({
      query: gql`
        query Data {
          listArticlePosts {
            data{
              id
              title

            }
          
          }
        }
      `,
    });
    return Promise.resolve(
      listArticlePosts.map((post) => ({ route: `blog/${post.id}` }))
    );
  }
);
