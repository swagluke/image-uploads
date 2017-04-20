// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC_bOb8duCAR_586-okn0b2jYH-MC1zWss",
    authDomain: "zhangl-image-uploads.firebaseapp.com",
    databaseURL: "https://zhangl-image-uploads.firebaseio.com",
    projectId: "zhangl-image-uploads",
    storageBucket: "zhangl-image-uploads.appspot.com",
    messagingSenderId: "297375639528"
  }
};
