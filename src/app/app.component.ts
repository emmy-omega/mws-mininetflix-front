import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MovieService } from './movie.service';

declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  // user: firebase.User;
  model: { email: string; password: string } = { email: '', password: '' };
  constructor(public fireAuth: AngularFireAuth) {}
  ngOnInit(): void {
    // this.fireAuth.auth.onAuthStateChanged((user: firebase.User) => {
    //   this.user = user;
    // });
    ($ => {
      $(document).ready(() => {
        $('.modal').modal('attach events', '#loginLink', 'show');
        $('.dropdown').dropdown();
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
    ($ => {
      console.log(form);
    })(jQuery);

    this.fireAuth.auth.signInWithEmailAndPassword(
      form.value.email,
      form.value.password
    );
  }

  logout() {
    this.fireAuth.auth.signOut();
  }
}
