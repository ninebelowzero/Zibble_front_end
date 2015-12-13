angular
  .module('zibble')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', 'User', 'TokenService'];
  function UsersController($scope, User, TokenService){
    $scope.test = "Testing, 1, 2, 3...";
}