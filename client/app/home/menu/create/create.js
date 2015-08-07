angular.module('artemis.menu.create', [

])
.controller('CreateController', function($scope, $state, $window, Boards) {
  $scope.invite = function() {
    console.log('Invite UI');
    // TODO: some way to invite users via email or fb
  };

  $scope.create = function() {
    // --- testing
    console.log('Board created. Back to menu');
    $state.go('^');

    // --- dev
    // var params = {
    //   deceasedName: $scope.deceasedName,
    //   creator: user, // TODO
    //   guests: [users], // TODO
    // };
    // Boards.createBoard(params).then(function(board) {
    //   $state.go('^');
    // });
  };

  $scope.cancel = function() {
    $state.go('^');
  };
});
