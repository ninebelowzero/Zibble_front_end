angular
  .module('zibble')
  .controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'Game', 'RegexService'];
function GameController($scope, $timeout, Game, RegexService){

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

  /////////////////////////////
  ////// SWIPE EVENTS /////////
  /////////////////////////////
  
  $('#trackpad').on('swipeleft', function(){
    console.log("Swiped left!");
  })
 
  $('#trackpad').on('swiperight', function(){
    console.log("Swiped right!");
  })
 
  $('#trackpad').on('swipeup', function(){
    console.log("Swiped up!");
  })
 
  $('#trackpad').on('swipedown', function(){
    console.log("Swiped down!");
  })


  /////////////////////////////

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

  ////////////////////////////

  (function(){
    var supportTouch    = $.support.touch,
        scrollEvent     = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent  = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent  = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
      setup: function() {
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function(event) {
          var data = event.originalEvent.touches ?
              event.originalEvent.touches[ 0 ] :
              event,
              start = {
                time: (new Date).getTime(),
                coords: [ data.pageX, data.pageY ],
                origin: $(event.target)
              },
              stop;

          function moveHandler(event) {
            if (!start) {
              return;
            }
            var data = event.originalEvent.touches ?
                event.originalEvent.touches[ 0 ] :
                event;
            stop = {
              time: (new Date).getTime(),
              coords: [ data.pageX, data.pageY ]
            };

            // prevent scrolling
            if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
              event.preventDefault();
            }
          }
          $this
            .bind(touchMoveEvent, moveHandler)
            .one(touchStopEvent, function(event) {
              $this.unbind(touchMoveEvent, moveHandler);
              if (start && stop) {
                if (stop.time - start.time < 1000 &&
                    Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                    Math.abs(start.coords[0] - stop.coords[0]) < 75
                  ){
                  start.origin
                    .trigger("swipeupdown")
                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                }
              }
            start = stop = undefined;
          });
        });
      }
    };
    $.each({
      swipedown: "swipeupdown",
      swipeup: "swipeupdown"
    }, function(event, sourceEvent){
      $.event.special[event] = {
        setup: function(){
          $(this).bind(sourceEvent, $.noop);
        }
      };
    });

  })();


}