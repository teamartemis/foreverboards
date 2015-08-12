angular.module('artemis.services', ['ngCookies'])

.factory('Users', function($http, $cookies) {
  var signin = function(user) {
    return $http.get('https://api.parse.com/1/login', {params: user})
      .then(function(res) {
        $cookies.put('sessionToken', res.data.sessionToken);
        $cookies.put('userId', res.data.objectId);
      },
      function(res) {
        console.error(res.data);
      });
  };

  var signup = function(user) {
    return $http.post('https://api.parse.com/1/classes/_User', user)
      //first arg is success function callback
      .then(null, function(res) {
        console.error(res.data);
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
    var token = $cookies.get('sessionToken');
    $cookies.remove('sessionToken');
    $cookies.remove('userId');

    var req = {
      method: 'POST',
      url: 'https://api.parse.com/1/logout',
      headers: {
        'X-Parse-Session-Token': token
      }
    };

    return $http(req)
      //first arg is success function callback
      .then(null, function(res) {
        console.error(res.data);
      });


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
      .then(function(res) {
        return res.data.results;
      }, function(res) {
        console.error(res.data);
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
      .then(function(res) {
        return res.data.results;
      }, function(res) {
        console.error(res.data);
      });
  };

  var createBoard = function(data) {
    return $http.post('https://api.parse.com/1/classes/Board', data)
      //first arg is success function callback
      .then(null, function(res) {
        console.error(res.data);
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

.factory('Posts', function($http, $cookies) {
  var getPosts = function(boardId) {
    return $http.get('https://api.parse.com/1/classes/Post', {
      params: {
        where: {
          boardId: {
            className: 'Board',
            __type: 'Pointer',
            objectId: boardId
          }
        }
      }
    })
      .then(function(res) {
        return res.data.results;
      }, function(res) {
        console.error(res.data);
      });
  };

  var createPost = function(boardId, data) {
    var params = {
      userId: {
        __type: 'Pointer',
        className: '_User', // User is a special Parse class
        objectId: $cookies.get('userId')
      },
      boardId: {
        __type: 'Pointer',
        className: 'Board',
        objectId: boardId
      },
      content: data.content,
      photo: data.photo
    };

    return $http.post('https://api.parse.com/1/classes/Post', params)
      .then(null, function(res) {
        console.error(res.data);
      });
  };

  return {
    getPosts: getPosts,
    createPost: createPost
  };
});
