import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing';

import { MovieService, GET_MOVIES, GET_MOVIE } from './movie.service';

const movieStub = {
  imdbID: 'tt0933512',
  Title: 'Into The Matrix',
  Genre: 'Action',
  Plot: 'Some amazing plot',
  Director: 'Emmy Omega',
  Actor: 'Emmy Omega, Jean Oyo',
  Year: '2003',
  Release: '10/11/2003',
  Actors: 'actor 1, actor 2',
  Award: 'So many',
  Poster: 'poster image'
};
const moviesStub = [movieStub];

describe.only('MovieService', () => {
  let service: MovieService;
  let ctrl: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    });
    service = TestBed.get(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('#get should return all movie', () => {
    ctrl = TestBed.get(ApolloTestingController);
    service.get().subscribe(mvs => {
      expect(mvs).toBeDefined();
      expect(mvs).toContain(expect.objectContaining(movieStub));
    });
    const op = ctrl.expectOne(GET_MOVIES);
    op.flush({ data: { movies: moviesStub } });
    ctrl.verify();
  });

  test('#find should return a movie', () => {
    ctrl = TestBed.get(ApolloTestingController);
    service.find('Into The Matrix').subscribe(mv => {
      expect(mv).toBeDefined();
      expect(mv).toEqual(expect.objectContaining(movieStub));
    });
    const op = ctrl.expectOne(GET_MOVIE);
    op.flush({ data: { movie: movieStub } });
  });
});
