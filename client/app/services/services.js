angular.module('artemis.services', ['ngCookies'])

.factory('Users', function($http, $cookies, $q) {
  var signin = function(user) {
    return $http.get('https://api.parse.com/1/login', {params: user})
      .then(function(res) {
        $cookies.put('sessionToken', res.data.sessionToken);
        $cookies.put('userId', res.data.objectId);
      }, function(err) {
        return $q.reject('Username and password don\'t match.');
      });
  };

  var signup = function(user) {
    /*user.ACL = {
      '*': {}
    };*/
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

  var getUserIdFromEmail = function(email) {
    var req = {
      method: 'GET',
      url: 'https://api.parse.com/1/classes/_User',
      params: {
        where: {
          email: email
        }
      }
    };

    return $http(req)
      .then(function(res) {
        return res.data.results[0].objectId;
      },
      function(res) {
        console.error(res.data);
      });
  };

  var signout = function() {
    return $http.post('https://api.parse.com/1/logout')
      .then(function() {
        // remove anything that should be removed from local storage
        $cookies.remove('sessionToken');
        $cookies.remove('userId');
      }, function(res) {
        console.error(res.data);
      });
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getUserIdFromEmail: getUserIdFromEmail,
    getSessionToken: getSessionToken
  };
})

.factory('Boards', function($http, $cookies) {
  var getBoard = function(id) {
    return $http.get('https://api.parse.com/1/classes/Board/' + id)
      .then(function(res) {
        return res.data;
      }, function(res) {
        console.error(res.data);
      });
  };

  var getBoards = function() {
    return $http.get('https://api.parse.com/1/classes/Board')
      .then(function(res) {
        return res.data.results;
      }, function(res) {
        console.error(res.data);
      });
  };

  var updateBoard = function(boardId, data) {
    return $http.put('https://api.parse.com/1/classes/Board/' + boardId, data);
  };

  var createBoard = function(data) {
    data.ACL = {'*': {}};
    data.ACL[$cookies.get('userId')] = {read: true, write: true};
    return $http.post('https://api.parse.com/1/classes/Board', data)
      //first arg is success function callback
      .then(null, function(res) {
        console.error(res.data);
      });
  };

  return {
    getBoard: getBoard,
    getBoards: getBoards,
    updateBoard: updateBoard,
    createBoard: createBoard
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
