angular
  .module('zibble', ['angular-jwt', 'ngResource'])
  .constant('API', 'http://localhost:3000')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  });