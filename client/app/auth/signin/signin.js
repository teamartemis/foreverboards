angular.module('artemis.auth.signin', [])

.controller('SignInController', function($scope, $window, $state, Users) {
  $scope.signin = function() {
    Users.signin({
      username: $scope.username,
      password: $scope.password
    })
    .then(function() {
      $state.go('home.menu');
    }, function(error) {
      $scope.error = error;
    });
  };

  $scope.demo = function() {
    Users.signin({
      username: 'demo',
      password: 'demo'
    })
    .then(function() {
      $state.go('home.menu');
    }, function(error) {
      $scope.error = error;
    });
  };
});
