angular.module('artemis.menu.create', [

])
.controller('CreateController', function($scope, $state, $window, Boards) {
  $scope.invite = function() {
    console.log('Invite UI');
    // TODO: some way to invite users via email or fb
  };

  $scope.create = function() {
    if (!$scope.deceasedName) {
      // TODO: display error message
      return console.log('Cannot create board with empty name');
    }

    var params = {
      deceasedName: $scope.deceasedName
    //   creator: user, // TODO
    //   guests: [users], // TODO
    };
    Boards.createBoard(params).then(function(res) {
      $state.go('home.board', {id: res.data.objectId});
    });
  };

  $scope.cancel = function() {
    $state.go('^');
  };
});
