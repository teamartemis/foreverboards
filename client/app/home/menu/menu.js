angular.module('artemis.menu', [
  'artemis.menu.create'
])
.controller('MenuController', function($scope, $state, Boards, Users) {
  $scope.boards = [];

  $scope.create = function() {
    $state.go('home.menu.create');
  };

  $scope.getBoards = function() {
    var token = Users.getSessionToken();
    Boards.getBoards(token).then(function(res) {
      $scope.boards = res.data.results;
    });
  };

  $scope.isState = function(name) {
    return $state.current.name === name;
  };

  $scope.getBoards();
});
