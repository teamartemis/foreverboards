angular.module('artemis.services', [])

.factory('Posts', function($http) {
  var getPosts = function(id) {
    // id = boardId
    // return all posts for this board
  };

  return {
    getPosts: getPosts
  };
})
.factory('Users', function($http) {
  var signin = function(user) {
    return $http.get('https://api.parse.com/1/login', {params: user})
    .success(function(res) {
      console.log('Login success!');
    })
    .error(function(res) {

    });
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
    // remove anything that should be removed from local storage
    // transition user to sign in page
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('Boards', function($http) {
  var getBoard = function(id) {
    // id = boardId
    // return any necessary details for this board
    // Ex:
      // name of deceased
      // picture
      // description
  };

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
    getBoard: getBoard,
    getBoards: getBoards,
    createBoard: createBoard,
    checkAccess: checkAccess
  };
});
