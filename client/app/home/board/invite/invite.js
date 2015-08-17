angular.module('artemis.board.invite', [])
.controller('InviteController', function($scope, $modalInstance) {
  $scope.submit = function() {
    $modalInstance.close($scope.invitee);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
