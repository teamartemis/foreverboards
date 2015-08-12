angular.module('artemis', [
  'artemis.auth',
  'artemis.home',
  'artemis.board',
  'artemis.services',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/menu');

  $stateProvider
    .state('home', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .state('home.menu', {
      url: '/menu',
      templateUrl: 'app/home/menu/menu.html',
      controller: 'MenuController'
    })
    .state('home.menu.create', {
      url: '/create',
      templateUrl: 'app/home/menu/create/create.html',
      controller: 'CreateBoardController'
    })
    .state('home.board', {
      url: '/board/:id',
      templateUrl: 'app/home/board/board.html',
      controller: 'BoardController'
    })
    .state('home.board.create', {
      url: '/create',
      views: {
        'create': {
          templateUrl: 'app/home/board/create/create.html',
          controller: 'CreatePostController'
        }
      }
    })
    .state('home.board.invite', {
      url: '/invite',
      views: {
        'invite': {
          templateUrl: 'app/home/board/invite/invite.html',
          controller: 'InviteController'
        }
      }
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
    .state('auth.signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin/signin.html',
      controller: 'SignInController'
    })
    .state('auth.signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup/signup.html',
      controller: 'SignUpController'
    });

  $httpProvider.interceptors.push('AllowCORS');
})
.factory('AllowCORS', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      // var jwt = $window.localStorage.getItem('com.shortly');
      // if (jwt) {
      //   object.headers['x-access-token'] = jwt;
      // }
      //object.headers['Allow-Control-Allow-Origin'] = '*';
      object.headers['X-Parse-Application-Id'] = '9oSMpCeMJYGTeXIxmfYwxgQR7EKS47Q7Ayuv0vwb';
      object.headers['X-Parse-REST-API-Key'] = 'Ejpf8BZDwyiT0Hg902yZ8cffJimRJ6VhQAmC6sCh';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, $state, Users) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'auth.signup' || toState.name === 'auth.signin') {
      //do nothing
    } else if (!Users.isAuth()) {
      event.preventDefault();
      $state.go('auth.signin');
    }
  });
});
