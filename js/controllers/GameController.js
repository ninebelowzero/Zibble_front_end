angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', 'Game'];
function GameController($scope, Game){

  $scope.characters = Game.firstBatch();
  

}