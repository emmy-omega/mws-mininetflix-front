import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';

jest.mock('../movie.service');

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieService: jest.Mock<MovieService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [MovieService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.get(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('has property movies on init', () => {
    expect(component.movies).toBeDefined();
    component.movies.subscribe(mvs => {
      expect(mvs).toBeInstanceOf(Array);
    });
  });
});
