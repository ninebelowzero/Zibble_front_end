angular
  .module('zibble')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', 'User', 'TokenService'];
function UsersController($scope, User, TokenService){

  $scope.user = {};

  function handleLogin(res){
    var token = res.token ? res.token : null;

    if(token){
      // console.log(res);
      $scope.user = TokenService.getUser();
    }
    $scope.message = res.message;
  }

  $scope.login = function(){
    User.login($scope.user, handleLogin);
  }

  $scope.logout = function(){
    TokenService.removeToken();
    $scope.user = {};
  }

  // $scope.register = function(){
  //   User.register($scope.user, handleLogin);
  // }

  $scope.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  if ($scope.isLoggedIn()){
    $scope.user = TokenService.getUser();
  }


}