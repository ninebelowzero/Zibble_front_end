angular
  .module('zibble')
  .controller('BlockersController', BlockersController);

BlockersController.$inject = ['$scope', 'User', 'TokenService'];
function BlockersController($scope, User, TokenService){

  $scope.isLoggedIn = !!TokenService.getToken();
  if ($scope.isLoggedIn){
    $scope.user = TokenService.getUser();
  }
  $scope.blockers = [];

  function getBlockers(){
    User.getBlockers({ id: $scope.user._id }, function(res){
      console.log("res:", res);
      console.log("res.blockers:", res.blockers);

      if (res.blockers.length > 0){
        $scope.blockers = [];
        res.blockers.forEach(function(blocker){
          console.log("blocker:", blocker);
          $scope.blockers.push(blocker);
        });
      }

    });
  }

  if ($scope.isLoggedIn){
    getBlockers();
  }
  
}