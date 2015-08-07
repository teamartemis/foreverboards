angular.module('artemis.services', [])

.factory('Posts', function($http) {

})
.factory('Users', function($http) {
  var signin = function(user) {

  };

  var signup = function(user) {

  };

  var isAuth = function() {

  };

  var signout = function() {

  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('Boards', function($http) {
  var getBoards = function(user) {
    // user = { username, password }
    // get boards that are owned/administered by the user
  };

  var createBoard = function(data) {
    // create board
  };

  var checkAccess = function(user, board) {
    // return a promise that resolves into a boolean
    // indicating whether or not the user has access to the board
  };

  return {
    getBoards: getBoards,
    createBoard: createBoard,
    checkAccess: checkAccess
  };
});
