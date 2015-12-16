angular
  .module('zibble')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$location', '$timeout', 'User', 'TokenService'];
function UsersController($scope, $location, $timeout, User, TokenService){

  $scope.user = {};

  function handleLogin(res){
    var token = res.token ? res.token : null;
    if(token){
      $scope.user = TokenService.getUser();
    }
    $scope.message = res.message;
    $location.path("/home");
  }

  $scope.login = function(){
    User.login($scope.user, handleLogin);
  }

  $scope.logout = function(){
    TokenService.removeToken();
    $scope.user = {};
    $scope.message = "Successfully logged out.";
    console.log("About to set timeout.");
    $location.path("/home");
  }

  $scope.register = function(){
    User.register($scope.user, handleLogin);
  }

  $scope.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  if ($scope.isLoggedIn()){
    $scope.user = TokenService.getUser();
  }

}