// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBrqK8IpTKFWQmJwyOP988GlPnEMAuOSsc',
    authDomain: 'mws-p2c1.firebaseapp.com',
    databaseURL: 'https://mws-p2c1.firebaseio.com',
    projectId: 'mws-p2c1',
    storageBucket: 'mws-p2c1.appspot.com',
    messagingSenderId: '199716533892',
    appId: '1:199716533892:web:109343126dc1ba7647f4d1',
    measurementId: 'G-6W8ZZR19FT'
  },
  imdb: {
    key: '2d0c12a8',
    url: 'http://omdbapi.com'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
