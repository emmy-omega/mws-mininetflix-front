import { of } from 'rxjs';
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
const mock = (jest.genMockFromModule('../movie.service') as any).MovieService;

mock.prototype = {
  get: jest.fn().mockReturnValue(of([movieStub])),
  find: jest.fn().mockImplementation((title: string) => of(movieStub))
};

export const MovieService = mock;
