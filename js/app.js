angular
  .module('zibble', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url         : '/',
      templateUrl : 'home.html'
    });

  $stateProvider
    .state('account', {
      url         : '/account',
      templateUrl : 'account.html'
    });

  $urlRouterProvider.otherwise('/');
}