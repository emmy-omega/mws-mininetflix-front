import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      imdbID
      Title
      Genre
      Director
      Year
      Plot
      Poster
    }
  }
`;
export const GET_MOVIE = gql`
  query GetMovie($imdbID: String) {
    movie(imdbID: $imdbID) {
      imdbID
      Title
      Genre
      Director
      Year
      Plot
      Actors
      Released
      Awards
      Poster
      Rating
      Rated
      Runtime
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private apollo: Apollo) {}

  get(): Observable<any> {
    return this.apollo
      .watchQuery({ query: GET_MOVIES })
      .valueChanges.pipe(
        map(
          ({ data: { movies } }: ApolloQueryResult<{ movies: [any] }>) => movies
        )
      );
  }

  find(id): Observable<any> {
    return this.apollo
      .query({ query: GET_MOVIE, variables: { imdbID: id } })
      .pipe(
        map(({ data: { movie } }: ApolloQueryResult<{ movie: [any] }>) => movie)
      );
  }
}
