angular.module('artemis.auth.signin', [])

.controller('SignInController', function($scope, $window, $state, Users) {
  $scope.signin = function() {
    Users.signin({
      username: $scope.username,
      password: $scope.password
    })
    .success(function() {
      $state.go('menu');
    })
    .error(function(err) {
      console.error(err);
    });
  };
});
