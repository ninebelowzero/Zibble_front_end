angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'Game', 'RegexService', '$swipe'];
function GameController($scope, $timeout, Game, RegexService, $swipe){

  $scope.rightOrWrong  = "neither";
  $scope.message       = null;
  $scope.asking        = "pinyin";
  $scope.showingAnswer = false;
  $scope.right         = 0;
  $scope.wrong         = 0;
  $scope.level         = 1;
  loadLevel();

  function loadLevel(){
  Game.get({ id: $scope.level }, function(data){
    $scope.characters = _.shuffle(data.characters);
    $scope.characters = _.filter($scope.characters, function(character){
      if (!character.kMandarin || !character.kDefinition) return false;
      return true;
    });
    getNextCharacter();
  });
  }

  function getNextCharacter(){
    $timeout(function(){
      $scope.showingAnswer = false;
      $scope.asking = "pinyin";
      $scope.rightOrWrong = "neither";
      $scope.message = "Select the right pinyin.";
      if ($scope.right == 0 && $scope.wrong == 0){
        $scope.message += " Swipe up, down, left or right.";
      }
      if ($scope.characters.length < 10){
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

  ///////// SWIPES /////////////

  $scope.swipeUp = function(){
    console.log("Swiped up.");
    $scope.choose($scope.answers[0]);
  }

  $scope.swipeLeft = function(){
    console.log("Swiped left.");
    $scope.choose($scope.answers[1]);
  }

  $scope.swipeRight = function(){
    console.log("Swiped right.");
    $scope.choose($scope.answers[2]);
  }

  $scope.swipeDown = function(){
    console.log("Swiped down.");
    $scope.choose($scope.answers[3]);
  }

  //////////////////////////////

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

  function getDefinitionAnswers(){
    $scope.message = "Select the right definition.";
    $scope.answers = [ $scope.selectedCharacter.kDefinition ]
    while ($scope.answers.length < 4){
      $scope.answers.push(getRandomCharacter().kDefinition);
    }
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
  if($scope.level == 5){
    $scope.message = "Congratulations! You have learned 4000 characters. Go forth, and multiply.";
  } else {
    $scope.message = "You have completed level " + $scope.level + "!";
    $timeout(function(){
      $scope.level++;
      $scope.message = "Loading level " + $scope.level;
      loadLevel();
      }, 1000);
    }
  }

}