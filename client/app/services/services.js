angular.module('artemis.services', [])

.factory('Users', function($http) {
  var signin = function(user) {
    return $http.get('https://api.parse.com/1/login', {params: user})
      .error(function(err) {
        console.error(err);
      });
  };

  var signup = function(user) {
    return $http.post('https://api.parse.com/1/classes/_User', user)
      .error(function(err) {
        console.error(err);
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
    return $http.get('https://api.parse.com/1/classes/Board', {where: {objectId: id}})
      .error(function(err) {
        console.log(err);
      });
  };

  var getBoards = function(user) {
    // user = { username, password }
    // TODO: get boards that are owned/administered by the user
    return $http.get('https://api.parse.com/1/classes/Board')
      .error(function(err) {
        console.error(err);
      });
  };

  var createBoard = function(data) {
    return $http.post('https://api.parse.com/1/classes/Board', data)
      .error(function(err) {
        console.error(err);
      });
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
})

.factory('Posts', function($http) {
  var getPosts = function(boardId) {
    return $http.get('https://api.parse.com/1/classes/Post', {
      params: {
        where: {
          boardId: {
            className: 'Board',
            '__type': 'Pointer',
            objectId: boardId
          }
        }
      }
    })
      .error(function(err) {
        console.error(err);
      });
  };

  return {
    getPosts: getPosts
  };
});
