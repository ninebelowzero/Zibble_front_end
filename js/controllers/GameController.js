angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', 'Game'];
function GameController($scope, Game){

  $scope.levelLoaded = false;
  $scope.characters = [];
  $scope.selectedCharacter = null;
  $scope.answerA = null;
  $scope.answerB = null;
  $scope.answerC = null;
  $scope.answerD = null;

  Game.firstBatch(function(data) {
    $scope.characters        = data.characters;
    $scope.selectedCharacter = getRandomCharacter();
    getAnswers();
    $scope.levelLoaded = true;

    // do some game logic, now data has loaded...
  });

  function getAnswers(){

    var answers = [
      $scope.selectedCharacter.kMandarin,
      getRandomCharacter().kMandarin,
      getRandomCharacter().kMandarin,
      getRandomCharacter().kMandarin
    ]

    answers = _.map(answers, function(answer){
      return answer.split(" ")[0].toLowerCase();
    });

    // REGEX NEEDED...
    // answers = _.map(answers, function(answer){
    //   if (_.last(answer) == "1"){
    //     console.log(answer[answer.length - 2]);
    //   }
    // });

    answers = _.shuffle(answers);

    $scope.answerA = answers[0];
    $scope.answerB = answers[1];
    $scope.answerC = answers[2];
    $scope.answerD = answers[3];

    console.log(answers);
  }


  function getRandomCharacter() {
    return $scope.characters[Math.ceil(Math.random() * $scope.characters.length)];
  }


}