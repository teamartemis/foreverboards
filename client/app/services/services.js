angular.module('artemis.services', ['ngCookies'])

.factory('Users', function($http, $cookies) {
  var signin = function(user) {
    return $http.get('https://api.parse.com/1/login', {params: user})
    .success(function(res) {
      $cookies.put('sessionToken', res.sessionToken);
      $cookies.put('userId', res.objectId);
    })
    .error(function(res) {

    });
  };

  var signup = function(user) {
    return $http.post('https://api.parse.com/1/classes/_User', user)
      .error(function(err) {
        console.error(err);
      });
  };

  var isAuth = function() {
    return !!$cookies.get('sessionToken');
  };

  var getSessionToken = function() {
    return $cookies.get('sessionToken');
  };

  var signout = function() {
    // remove anything that should be removed from local storage
    // transition user to sign in page
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getSessionToken: getSessionToken
  };
})

.factory('Boards', function($http) {
  var getBoard = function(id) {
    return $http.get('https://api.parse.com/1/classes/Board', {where: {objectId: id}})
      .error(function(err) {
        console.log(err);
      });
  };

  var getBoards = function(token, user) {
    // user = { username, password }
    // TODO: get boards that are owned/administered by the user
    var req = {
      method: 'GET',
      url: 'https://api.parse.com/1/classes/Board',
      headers: {
        'X-Parse-Session-Token': token
      }
    };
    return $http(req)
      .error(function(err) {
        //TODO: error handling
        console.log(err);
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
