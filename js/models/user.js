angular
  .module('zibble')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API){

  return $resource(API + 'users/:id', { id: '@id' }, {
    'login'    : { method: 'POST', url: API + '/login'},
    'register' : { method: 'POST', url: API + '/register' },
    'getBlockers' : { method: 'GET', url: API + '/users/:id/blockers' }
  });

}