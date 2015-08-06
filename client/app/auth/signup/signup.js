angular.module('artemis.auth.signup', [])

.controller('SignUpController', function($scope, $window, Users) {
  $scope.signup = function() {
    Users.signup({
      username: $scope.username,
      password: $scope.password
    })
    .then(function() {

    })
    .catch(function() {

    })
  }
})