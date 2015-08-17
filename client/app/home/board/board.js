angular.module('artemis.board', [
  'artemis.board.create',
  'artemis.board.invite'
])

.controller('BoardController', function($scope, $stateParams, $state, $modal, $q, Users, Boards, Posts) {
  $scope.boardId = $stateParams.id;
  $scope.$stateParams = $stateParams;
  $scope.$state = $state;

  $scope.create = function() {
    // open a modal window
    var modalCreate = $modal.open({
      animation: true,
      templateUrl: 'app/home/board/create/create.html',
      controller: 'CreatePostController'
    });

    // result is a promise
    modalCreate.result.then(function(params) {
      // when resolved, create post using params
      Posts.createPost($scope.boardId, params).then(function(res) {
        $scope.getPosts();
      });
    }, function() {
      // when rejected, log message
      console.log('modal dismissed');
    });
  };

  $scope.invite = function() {
    // open a modal window
    var modalInvite = $modal.open({
      animation: true,
      templateUrl: 'app/home/board/invite/invite.html',
      controller: 'InviteController'
    });

    // result is a promise
    modalInvite.result.then(function(email) {
      // when resolved, fetch user and board information, and assign ACL
      $q.all([Users.getUserIdFromEmail(email), Boards.getBoard($scope.boardId)])
        .then(function(params) {
          var userId = params[0];
          var board = params[1].data;
          if (!board.ACL) {
            return console.log('No ACL. This board is already public');
          }
          board.ACL[userId] = {
            read: true,
            write: true
          };
          console.log('User added to board');
          return Boards.updateBoard($scope.boardId, {ACL: board.ACL});
        });
    }, function() {
      // when rejected, log message
      console.log('modal dismissed');
    });
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
