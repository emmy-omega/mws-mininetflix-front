import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { AngularFireAuth } from '@angular/fire/auth';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, fireAuth: AngularFireAuth) {
  // const token = fireAuth.auth.currentUser.getIdToken;
  // const auth = setContext((operation, context) => ({
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }));
  return {
    link: httpLink.create({ uri }),
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
