angular
  .module('zibble')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource){
  return "Done.";
}