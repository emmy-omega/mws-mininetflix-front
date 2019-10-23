import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Observable, forkJoin, from } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  combineAll,
  concatAll,
  delay
} from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

const movieTitles = [
  'Glass',
  'The Kid Who Would Be King',
  'Miss Bala',
  'What Men Want',
  'Alita: Battle Angel',
  'Fighting with My Family',
  'Happy Death Day 2U',
  'How to Train Your Dragon: The Hidden World',
  'A Madea Family Funeral',
  'Captain Marvel',
  'The Kid',
  'Wonder Park',
  'The Hummingbird Project',
  'The Aftermath',
  'Us',
  'Hotel Mumbai',
  'Dumbo',
  'The Beach Bum',
  'Shazam!',
  'Pet Sematary',
  'The Best of Enemies',
  'Hellboy',
  'Little',
  'Missing Link',
  'The Curse of La Llorona',
  'Avengers: Endgame',
  'UglyDolls',
  'Long Shot',
  'Pokémon Detective Pikachu',
  'The Hustle',
  'Tolkien',
  'John Wick: Chapter 3 - Parabellum',
  'Aladdin',
  'Brightburn',
  'Booksmart',
  'Godzilla: King of the Monsters',
  'Rocketman',
  'Dark Phoenix',
  'The Secret Life of Pets 2',
  'Men in Black: International',
  'Shaft',
  'Toy Story 4',
  'Annabelle Comes Home',
  'Yesterday',
  'Spider-Man: Far from Home',
  'Stuber',
  'Crawl',
  'The Farewell'
];
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // constructor(private apollo: Apollo) {}
  // get(): Observable<any> {
  //   return this.apollo
  //     .watchQuery({ query: GET_MOVIES })
  //     .valueChanges.pipe(
  //       map(
  //         ({ data: { movies } }: ApolloQueryResult<{ movies: [any] }>) => movies
  //       )
  //     );
  // }

  // find(id): Observable<any> {
  //   return this.apollo
  //     .query({ query: GET_MOVIE, variables: { imdbID: id } })
  //     .pipe(
  //       map(({ data: { movie } }: ApolloQueryResult<{ movie: [any] }>) => movie)
  //     );
  // }

  // favorite(uid, imdbID) {
  //   return this.apollo;
  // }

  movies: [object];
  constructor(
    private http: HttpClient,
    private ngFireAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore
  ) {
    this.getMovies().subscribe((mvs: [object]) => (this.movies = mvs));
  }

  getMovies(): Observable<object[]> {
    const movies: Observable<object>[] = movieTitles.slice(0, 8).map(title =>
      this.http.get(environment.imdb.url, {
        params: { apikey: environment.imdb.key, t: title }
      })
    );
    return forkJoin(movies);
  }

  getMovie(imdbID: string): Observable<object> {
    return this.http.get(environment.imdb.url, {
      params: { apikey: environment.imdb.key, i: imdbID }
    });
  }

  private shell(mList, key): Observable<object[]> {
    const mItem$: Observable<object>[] = mList.map(title =>
      this.http.get(environment.imdb.url, {
        params: { apikey: environment.imdb.key, [key]: title }
      })
    );
    return forkJoin(mItem$);
  }

  getFavorites(): Observable<object[]> {
    const favRef = this.ngFirestore
      .collection('favorite')
      .doc(this.ngFireAuth.auth.currentUser.uid);
    return favRef.valueChanges().pipe(
      map(favs => {
        return this.shell(favs, 'i');
      }),
      combineAll(),
      delay(1000)
    );
  }

  addFavorite(imdbID: string) {
    const favRef = this.ngFirestore
      .collection('favorite')
      .doc(this.ngFireAuth.auth.currentUser.uid);
    favRef.set({}, { merge: true });
    favRef.update({ movies: firestore.FieldValue.arrayUnion(imdbID) });
  }
}
