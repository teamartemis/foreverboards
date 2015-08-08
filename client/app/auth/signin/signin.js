angular.module('artemis.auth.signin', [])

.controller('SignInController', function($scope, $window, $state, Users) {
  $scope.signin = function() {
    Users.signin({
      username: $scope.username,
      password: $scope.password
    })
    .then(function() {
      $state.go('home.menu');
    })
    .catch(function(err) {
      console.error(err);
    });
  };
});
