angular.module('artemis.board', [
])

.controller('BoardController', function($scope, $stateParams, $state, Boards, Posts) {
  $scope.boardId = $stateParams.id;
  $scope.$stateParams = $stateParams;
  $scope.$state = $state;

  $scope.getBoard = function() {
    Boards.getBoard($scope.boardId).then(function(res) {
      $state.board = res.data.results;
    });
  };

  $scope.getPosts = function() {
    Posts.getPosts($scope.boardId).then(function(res) {
      $state.posts = res.data.results;
    });
  };

  $scope.getBoard();
  $scope.getPosts();
});
