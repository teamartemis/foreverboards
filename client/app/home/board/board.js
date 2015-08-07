angular.module('artemis.board', [
])

.controller('BoardController', function($scope, $stateParams, $state, Boards, Posts) {
  $scope.id = $stateParams.id;
  $scope.$stateParams = $stateParams;
  $scope.$state = $state;

  $scope.getBoard = function() {
    Boards.getBoard($scope.id).then(function(data) {
      // do something with the info
    });
  };

  $scope.getPosts = function() {
    Posts.getPosts($sope.id).then(function(data) {
      // do something with the posts
    });
  };

  // NOTE: uncomment once Boards.getBoard and Posts.getPosts are implemented
  // $scope.getBoard();
  // $scope.getPosts();
});
