angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'Game', 'RegexService'];
function GameController($scope, $timeout, Game, RegexService){

  $scope.rightOrWrong  = null;
  $scope.message       = null;
  $scope.asking        = "pinyin";
  $scope.showingAnswer = false;
  $scope.right         = 0;
  $scope.wrong         = 0;
  $scope.level         = 1;

  Game.get({ id: $scope.level }, function(data){
    $scope.characters = _.shuffle(data.characters);
    getNextCharacter();
  });

  function getNextCharacter(){
    $timeout(function(){
      $scope.showingAnswer = false;
      $scope.rightOrWrong = null;
      $scope.message = "Select the right pinyin.";
      if ($scope.right == 0 && $scope.wrong == 0){
        $scope.message += " Swipe up, down, left or right.";
      }
      if ($scope.characters.length == 0){
        endOfLevel();
      } else {
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

  $scope.choose = function(choice){
    console.log(choice);
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

  function getDefinitionAnswers(){
    $scope.message = "Select the right definition.";
    $scope.answers = [ $scope.selectedCharacter.kDefinition ]
    _(3).times(function(){
      $scope.answers.push(getRandomCharacter().kDefinition);
    });
    $scope.answers = _.shuffle($scope.answers);
  }

  function getRandomCharacter() {
    return $scope.characters[Math.ceil(Math.random() * $scope.characters.length)];
  }

  function rightAnswer(){
    $scope.right++;
    $scope.rightOrWrong = "right";
    $scope.message = "Correct!";
    getNextCharacter();
  }

  function wrongAnswer(){
    $scope.wrong++;
    $scope.rightOrWrong = "wrong";
    $scope.message = "Wrong!";
    $scope.correctPinyin = RegexService.clean($scope.selectedCharacter.kMandarin);
    $scope.showingAnswer = true;
    getNextCharacter();
  }

  function endOfLevel(){
    $scope.message = "You have completed level " + $scope.level + "!";
  }

}