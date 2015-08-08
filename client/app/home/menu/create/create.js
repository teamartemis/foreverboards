angular.module('artemis.menu.create', [

])
.controller('CreateController', function($scope, $state, $window, Boards) {
  $scope.invite = function() {
    console.log('Invite UI');
    // TODO: some way to invite users via email or fb
  };

  $scope.create = function() {
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
