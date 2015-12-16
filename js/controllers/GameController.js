angular
  .module('zibble')
  .controller('GameController', GameController);

// var regexTheHellOutOfIt = require('./regexTheHellOutOfIt');
// console.log(regexTheHellOutOfIt);

GameController.$inject = ['$scope', '$timeout', 'Game', 'RegexService'];
function GameController($scope, $timeout, Game, RegexService){

  $scope.isCorrect     = "n-a";
  $scope.showingAnswer = false;
  $scope.correct       = 0;
  $scope.incorrect     = 0;
  $scope.level         = 1;

  Game.get({ id: $scope.level }, function(data){
    $scope.characters = _.shuffle(data.characters);
    getNextCharacter();
  });

  $scope.choose = function(choice){
    if ($scope.asking == "pinyin"){
      if (choice == RegexService.clean($scope.selectedCharacter.kMandarin)) {
        $scope.asking = "definition";
        getDefinitionAnswers();
      } else {
        wrongAnswer();
      }
    } else if ($scope.asking == "definition"){
      if (choice == $scope.selectedCharacter.kDefinition){
        rightAnswer();
      } else {
        wrongAnswer();
      }
    }
  }

  function rightAnswer(){
    $scope.correct++;
    $scope.isCorrect = "correct";
    $scope.message = "Right!";
    getNextCharacter();
  }

  function wrongAnswer(){
    $scope.incorrect++;
    $scope.isCorrect = "incorrect";
    $scope.message = "Wrong!";
    $scope.showingAnswer = true;
    $scope.correctPinyin = RegexService.clean($scope.selectedCharacter.kMandarin);
    getNextCharacter();
  }

  function getNextCharacter(){
    $timeout(function(){
      $scope.message = "";
      $scope.showingAnswer = false;
      if ($scope.characters.length == 0){
        endOfLevel();
      } else {
        $scope.asking = "pinyin";
        $scope.selectedCharacter = $scope.characters.shift();     
        $scope.answers = [ $scope.selectedCharacter.kMandarin ]
        _(3).times(function(){
          $scope.answers.push(getRandomCharacter().kMandarin);
        });
        $scope.answers = _.shuffle($scope.answers);      
        $scope.answers = _.map($scope.answers, function(answer){
          return RegexService.clean(answer);
        });
      }
    }, 1000)
  }

  function getDefinitionAnswers(){
    $scope.answers = [ $scope.selectedCharacter.kDefinition ]
    _(3).times(function(){
      $scope.answers.push(getRandomCharacter().kDefinition);
    });
    $scope.answers = _.shuffle($scope.answers);
  }

  function getRandomCharacter() {
    return $scope.characters[Math.ceil(Math.random() * $scope.characters.length)];
  }

  function endOfLevel(){
    $scope.message = "You have completed level 1!";
  }

}