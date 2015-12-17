angular
  .module('zibble')
  .controller('BlockersController', BlockersController);

BlockersController.$inject = ['$scope', 'User', 'TokenService'];
function BlockersController($scope, User, TokenService){

  $scope.user = TokenService.getUser();
  $scope.blockers = [];

  function initialize(){
    User.getBlockers({ id: $scope.user._id }, function(res){
      console.log("res:", res);
      console.log("res.blockers:", res.blockers);
      res.blockers.forEach(function(blocker){
        console.log("blocker:", blocker);
        $scope.blockers.push(blocker);
      });
    });
  }

  initialize();
  
}