import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
//import { ApolloClient } from 'apollo-client';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { environment } from 'src/environments/environment';

const uri = 'https://d2ldhnat8tybyp.cloudfront.net/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const basic = setContext(() => ({
    headers: new HttpHeaders()
      .set('Accept', 'charset=uf-8'),
  }));

  const auth = setContext((operation: any, ctx: { headers: { append: (arg0: string, arg1: string) => any; }; }) => ({
    headers: ctx.headers.append('Authorization', `${environment.webiny.GRAPHQL_API_TOKEN}`)
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache: new InMemoryCache()
  }
}


@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink, HttpClient],
  }],
})

export class GraphQLModule {}
