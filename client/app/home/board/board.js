angular.module('artemis.board', [
  'artemis.board.create'
])

.controller('BoardController', function($scope, $stateParams, $state, Boards, Posts) {
  $scope.boardId = $stateParams.id;
  $scope.$stateParams = $stateParams;
  $scope.$state = $state;

  $scope.create = function() {
    $state.go('home.board.create');
  };

  $scope.getBoard = function() {
    Boards.getBoard($scope.boardId).then(function(board) {
      $scope.board = board;
    });
  };

  $scope.getPosts = function() {
    Posts.getPosts($scope.boardId).then(function(posts) {
      $scope.posts = posts;
    });
  };

  $scope.isState = function(name) {
    return $state.current.name === name;
  };

  $scope.getBoard();
  $scope.getPosts();
})
.directive('post', function() {
  return {
    restrict: 'EA', // can be used as Element or Attribute
    templateUrl: 'app/home/board/post.html',
    replace: true, // replaces the directive tags in the DOM
    scope: { // defining object literal -> isolate scope (does not delegate upwards to parents)
      source: '='
      // '=' -> 2-way binding to whatever I designate as 'source', can be object/array
      // '@' means 1-way binding (changes in directive do not change outside)
      // '&' means passing in a function
    },
    link: function(scope, ele, attr) {
      // do stuff here
      console.log('post');
    }
  };
});
