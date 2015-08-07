angular.module('artemis.auth.signup', [])

.controller('SignUpController', function($scope, $window, $state, Users) {
  $scope.signup = function() {
    Users.signup({
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    })
    .then(function() {
      $state.go('auth.signin');
    })
    .catch(function() {

    });
  };
});
