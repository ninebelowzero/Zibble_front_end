angular
  .module('zibble', ['angular-jwt', 'ngResource', 'ui.router', 'ngTouch', 'swipe'])
  // .constant('API', 'https://zibble-back-end.herokuapp.com')
  .constant('API', 'http://localhost:3000')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state('home', {
      url         : '/',
      templateUrl : './views/home.html'
    });

  $stateProvider
    .state('blockers', {
      url         : '/blockers',
      templateUrl : './views/blockers.html'
    });

  $stateProvider
    .state('login', {
      url         : '/login',
      templateUrl : './views/login.html'
    });

  $stateProvider
    .state('signup', {
      url         : '/signup',
      templateUrl : './views/signup.html'
    });

  $stateProvider
    .state('logout', {
      url         : '/logout',
      templateUrl : './views/logout.html'
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}