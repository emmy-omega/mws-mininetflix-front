import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MovieService } from './movie.service';
import { AuthService } from './auth.service';

declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  // user: firebase.User;
  model: { email: string; password: string } = { email: '', password: '' };
  constructor(
    public fireAuth: AngularFireAuth,
    private mService: MovieService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // this.fireAuth.auth.onAuthStateChanged((user: firebase.User) => {
    //   ($ => {
    //     $('dropdown').
    //   })(jQuery)
    // });
    ($ => {
      $(document).ready(() => {
        // playground
        // ======
        if (this.fireAuth.user) {
          var $dropdownItem = $('.menu .dropdown .item'),
            $dropdown = $('.menu .ui.dropdown');
          $dropdown.dropdown({ on: 'hover' });
        }
        $('.ui.search').search({
          minCharacters: 3,
          apiSettings: {
            onResponse: function(resp) {
              let response: any = { items: [] };
              $.each(resp.Search, function(idx, mv) {
                response.items.push({
                  title: mv.Title,
                  url: '/movies/' + mv.imdbID
                });
              });
              return response;
            },
            url: 'http://omdbapi.com?apikey=2d0c12a8&type=movie&s={query}'
          },
          fields: {
            results: 'items',
            title: 'title',
            url: 'url'
          }
        });
      });
    })(jQuery);
  }

  login(form) {
    this.authService.signin();
  }

  logout() {
    // this.fireAuth.user.subscribe(u => u.delete());
    this.authService.signout();
  }
}
