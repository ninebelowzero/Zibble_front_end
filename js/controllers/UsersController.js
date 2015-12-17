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
    } else {
      $scope.message = res.message;
    }
    $scope.message = res.message;
  }

  $scope.login = function(){
    User.login($scope.user, handleLogin, function(res){
      $scope.message = res.data.message;
    });
  }

  $scope.logout = function(){
    TokenService.removeToken();
    $scope.user = {};
    $scope.message = "Successfully logged out.";
  }

  $scope.register = function(){
    User.register($scope.user, handleLogin, function(res){
      $scope.message = res.data.message;
    });
  }

  $scope.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  if ($scope.isLoggedIn()){
    $scope.user = TokenService.getUser();
  }

}