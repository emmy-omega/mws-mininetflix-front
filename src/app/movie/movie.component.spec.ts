import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterModule,
  ActivatedRoute,
  ParamMap,
  convertToParamMap
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { MovieComponent } from './movie.component';
import { MovieService } from '../movie.service';

jest.mock('../movie.service');

const $mockParamMap: Observable<ParamMap> = new BehaviorSubject(
  convertToParamMap({ id: 'book_id' })
).asObservable();

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = { paramMap: $mockParamMap };
    TestBed.configureTestingModule({
      declarations: [MovieComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        MovieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
