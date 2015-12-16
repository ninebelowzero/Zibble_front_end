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
    .state('login', {
      url         : '/login',
      templateUrl : 'login.html'
    });

    $stateProvider
      .state('signup', {
        url         : '/signup',
        templateUrl : 'signup.html'
      });


    $stateProvider
      .state('logout', {
        url         : '/logout',
        templateUrl : 'logout.html'
      });

  $urlRouterProvider.otherwise('/');
}