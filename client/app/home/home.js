angular.module('artemis.home', [
  'artemis.menu',
  'artemis.board'
])
.controller('HomeController', function($scope, $state, Users) {
  $scope.signout = function() {
    Users.signout();
    $state.go('auth.signin');
  };
});
