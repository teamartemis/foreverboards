angular.module('artemis.board.invite', [])
.controller('InviteController', function($scope, $state, $stateParams, $q, Boards, Users) {
  $scope.boardId = $stateParams.id;

  $scope.submit = function() {
    var email = $scope.invitee;
    $q.all([Users.getUserIdFromEmail(email), Boards.getBoard($scope.boardId)])
      .then(function(params) {
        var userId = params[0];
        var board = params[1].data;
        board.ACL[userId] = {
          read: true,
          write: true
        };
        return Boards.updateBoard($scope.boardId, {ACL: board.ACL});
      });
  };

  $scope.cancel = function() {
    $state.go('^');
  };
});
