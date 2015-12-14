angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', 'Game'];
function GameController($scope, Game){

  $scope.correct    = 0;
  $scope.incorrect  = 0;

  Game.firstBatch(function(data) {
    $scope.characters = _.shuffle(data.characters);
    getNextCharacter();
  });

  $scope.choose = function(choice){
    if ($scope.asking == "pinyin"){
      if (choice == $scope.selectedCharacter.kMandarin.split(" ")[0].toLowerCase()){
        $scope.asking = "definition";
        getDefinitionAnswers();
      } else {
        $scope.incorrect++;
        getNextCharacter();
      }
    } else if ($scope.asking == "definition"){
      if (choice == $scope.selectedCharacter.kDefinition){
        $scope.correct++;
        getNextCharacter();    
      } else {
        $scope.incorrect++;
        getNextCharacter();
      }
    }
  }

  function getNextCharacter(){
    $scope.asking = "pinyin";
    $scope.selectedCharacter = $scope.characters.shift();

    $scope.answers = [
      $scope.selectedCharacter.kMandarin,
      getRandomCharacter().kMandarin,
      getRandomCharacter().kMandarin,
      getRandomCharacter().kMandarin
    ]

    $scope.answers = _.shuffle($scope.answers);

    $scope.answers = _.map($scope.answers, function(answer){
      return answer.split(" ")[0].toLowerCase();
    });
  }

  function getDefinitionAnswers(){

    $scope.answers = [
      $scope.selectedCharacter.kDefinition,
      getRandomCharacter().kDefinition,
      getRandomCharacter().kDefinition,
      getRandomCharacter().kDefinition
    ]

    $scope.answers = _.shuffle($scope.answers);

  }


  function getRandomCharacter() {
    return $scope.characters[Math.ceil(Math.random() * $scope.characters.length)];
  }


}