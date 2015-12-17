angular
  .module('zibble')
  .controller('BlockersController', BlockersController);

BlockersController.$inject = ['$scope', 'User', 'TokenService'];
function BlockersController($scope, User, TokenService){

  $scope.user = TokenService.getUser();

  $scope.getBlockers = function(){
    User.getBlockers({ id: $scope.user._id }, function(blockers){
      console.log(blockers);
    });
  }
  


}