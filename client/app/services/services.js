angular.module('artemis.services', [])

.factory('Posts', function($http) {

})
.factory('Users', function($http) {
  var signin = function(user) {

  };

  var signup = function(user) {
    return $http.post('https://api.parse.com/1/classes/_User', user)
    .success(function(res) {
      console.log('services post successful');
    })
    .error(function(res) {

    });
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
