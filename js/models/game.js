angular
  .module('zibble')
  .factory('Game', Game);

Game.$inject = ['$resource', 'API'];
function Game($resource, API){

  return $resource(API + '/levels/:id', {id: '@_id'});

}