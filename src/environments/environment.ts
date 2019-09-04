// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  config: {
    apiKey: "AIzaSyAe0ScqtiKfcx-8VAA2WGB0jaqp5CK2x2A",
    authDomain: "map-project-660a8.firebaseapp.com",
    databaseURL: "https://map-project-660a8.firebaseio.com",
    projectId: "map-project-660a8",
    storageBucket: "",
    messagingSenderId: "807421239776",
    appId: "1:807421239776:web:2ccca8785c1745bd"
  },

  mapbox: {
  	accessToken: 'pk.eyJ1IjoicG9sbzkyIiwiYSI6ImNrMDU1Z2V1ajJ1ejYzb3E5NDRtcHFwbzUifQ.VN4RFuwH-_kX0Q-JqtzwLQ'
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
