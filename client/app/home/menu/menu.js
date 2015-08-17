angular.module('artemis.menu', [
  'artemis.menu.create'
])
.controller('MenuController', function($scope, $state, $modal, Boards, Users) {
  $scope.boards = [];

  $scope.create = function() {
    var modalCreate = $modal.open({
      animation: true,
      templateUrl: 'app/home/menu/create/create.html',
      controller: 'CreateBoardController'
    });

    // result is a promise
    modalCreate.result.then(function(params) {
      // when resolved, create board using params
      Boards.createBoard(params).then(function(res) {
        $scope.getBoards();
      });
    }, function() {
      console.log('modal dismissed');
    });
  };

  $scope.getBoards = function() {
    var token = Users.getSessionToken();
    Boards.getBoards(token).then(function(boards) {
      $scope.boards = boards;
    });
  };

  $scope.isState = function(name) {
    return $state.current.name === name;
  };

  $scope.getBoards();
});
