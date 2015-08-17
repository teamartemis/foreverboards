angular.module('artemis.auth.signup', [])

.controller('SignUpController', function($scope, $window, $state, Users) {
  $scope.signup = function() {
    if ($scope.password === $scope.passwordConfirm) {
      Users.signup({
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      })
      .then(function(res) {
        $state.go('auth.signin');
      });
    } else {
      //Display passwords do not match to user
    }
  };
});
