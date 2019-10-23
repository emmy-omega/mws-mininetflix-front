import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';

const uri = 'http://127.0.0.1:4000/graphql'; //'https://mws-mininetflix-back.herokuapp.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, fireAuth: AngularFireAuth) {
  let token = fireAuth.idToken.toPromise();

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext(async (operation, context) => ({
    headers: {
      Authorization: `Bearer ${await token}`
    }
  }));
  return {
    link: ApolloLink.from([basic, httpLink.create({ uri })]),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AngularFireAuth]
    }
  ]
})
export class GraphQLModule {}
