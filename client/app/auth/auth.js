angular.module('artemis.auth', [
  'artemis.auth.signin',
  'artemis.auth.signup'
])

.controller('AuthController', function($scope, $window) {
  $scope.background = 'auth-bg';
});
