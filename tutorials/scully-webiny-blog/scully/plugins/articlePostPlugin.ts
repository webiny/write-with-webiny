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
  import {environment } from '../../src/environments/environment';

  export const webinyPostSlugs = 'webinyPostSlugs';

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
        data: { articlePost },
      } = await client.query({
        query: gql`
        query Data {
            pageBuilder {
              listPublishedPages {
                data {
                  title
                }
              }
            }
          }
        `,
      });
      return Promise.resolve(
        articlePost.map((blog) => ({ route: `/p/${blog.slug}` }))
      );
    }
  );