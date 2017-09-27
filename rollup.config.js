export default {
  input: 'dist/ng-data-state.js',
  name: 'ngDataState',
  output: {
    file: 'dist/ng-data-state.umd.js',
    format: 'umd'
  },
  sourceMap: false,
  globals: {
    'lodash': '_',
    'rxjs': 'Rx',
    'socket.io-client': 'io',
    'ng-http-client-plus': 'ngHttpClientPlus',
    '@angular/core': 'ng.core'
  },
  external: [
    'lodash',
    'rxjs',
    'socket.io-client',
    'ng-http-client-plus',
    '@angular/core'
  ]  
};
