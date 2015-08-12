angular.module('artemis.board.invite', [])
.controller('InviteController', function($scope, $state, $stateParams, Boards, Users) {
  $scope.boardId = $stateParams.id;
  $scope.ACL;

  $scope.submit = function() {
    var email = $scope.invitee;
    Users.getUserIdFromEmail(email).then(function(userId) {
      $scope.getACL(userId);
    });
  };

  $scope.getACL = function(userId) {
    Boards.getBoard($scope.boardId).then(function(board) {
      $scope.ACL = board.ACL;
      $scope.addToACL(userId);
    });
  };

  $scope.addToACL = function(userId) {
    var boardId = $scope.boardId;
    var ACL = $scope.ACL;
    var token = Users.getSessionToken();
    Boards.addToACL(userId, boardId, token, ACL);
  };

  $scope.cancel = function() {
    $state.go('^');
  };
});
