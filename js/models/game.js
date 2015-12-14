angular
  .module('zibble')
  .factory('Game', Game);

Game.$inject = ['$resource', 'API'];
function Game($resource, API){

  return $resource(API + '/game', null, {
    'firstBatch'    : { method: 'GET', url: API + '/game/firstbatch' }
  });

}