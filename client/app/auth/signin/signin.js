angular.module('artemis.auth.signin', [])

.controller('SignInController', function($scope, $window, Users) {
  $scope.signin = function() {
    Users.signin({
      username: $scope.username,
      password: $scope.password
    })
    .then(function() {

    })
    .catch(function() {

    });
  };
});