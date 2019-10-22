import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: []
})
export class MovieComponent implements OnInit {
  movie: Observable<any>;

  constructor(private route: ActivatedRoute, private mService: MovieService) {}

  ngOnInit() {
    this.movie = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.mService.find(params.get('id')))
    );
  }
}
