angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', 'Game'];
function GameController($scope, Game){

  $scope.levelLoaded = false;
  $scope.characters = [];
  $scope.selectedCharacter = null;

  Game.firstBatch(function(data) {
    $scope.characters = data.characters;
    getRandomCharacter();
    $scope.levelLoaded = true;

    // do some game logic, now data has loaded...
  });

  function getRandomCharacter() {
    $scope.selectedCharacter = $scope.characters[Math.ceil(Math.random() * $scope.characters.length)].String;
  }

  $scope.chooseCharacter = function() {
    getRandomCharacter();
  }

}