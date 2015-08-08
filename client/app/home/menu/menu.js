angular.module('artemis.menu', [
  'artemis.menu.create'
])
.controller('MenuController', function($scope, $state, Boards) {
  $scope.boards = [];

  $scope.create = function() {
    $state.go('home.menu.create');
  };

  $scope.getBoards = function() {
    Boards.getBoards().then(function(res) {
      $scope.boards = res.data.results;
    });
  };

  $scope.isState = function(name) {
    return $state.current.name === name;
  };

  $scope.getBoards();
});

// --- testing
/*
  {
    objectId: 1,
    deceasedName: 'Ned Stark',
    url: 'http://www.google.com'
  },
  {
    objectId: 2,
    deceasedName: 'Tywin Lannister',
    url: 'http://www.amazon.com'
  },
  {
    objectId: 3,
    deceasedName: 'The Hound',
    url: 'http://www.apple.com'
  }
*/
