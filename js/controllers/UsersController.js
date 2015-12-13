angular
  .module('zibble')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', 'User', 'TokenService'];
function UsersController($scope, User, TokenService){
  $scope.test = "Testing, 1, 2, 3...";
  $scope.user = {};

  function handleLogin(res){
    var token = res.token ? res.token : null;

    if(token){
      console.log(res);
      $scope.user = TokenService.getUser();
    }
    $scope.message = res.message;
  }

  $scope.login = function(){
    User.login($scope.user, handleLogin);
  }

  $scope.register = function(){
    User.join($scope.user, handleLogin);
  }

  $scope.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  if ($scope.isLoggedIn()){
    $scope.user = TokenService.getUser();
  }


}