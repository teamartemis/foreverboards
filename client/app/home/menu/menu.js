angular.module('artemis.menu', [
  'artemis.menu.create'
])
.controller('MenuController', function($scope, $state, Boards) {
  // --- testing
  $scope.boards = [
    {
      id: 1,
      deceasedName: 'Ned Stark',
      url: 'http://www.google.com'
    },
    {
      id: 2,
      deceasedName: 'Tywin Lannister',
      url: 'http://www.amazon.com'
    },
    {
      id: 3,
      deceasedName: 'The Hound',
      url: 'http://www.apple.com'
    }
  ];

  $scope.create = function() {
    $state.go('home.menu.create');
  };

  $scope.getBoards = function() {
    Boards.getBoards().then(function(response) {
      $scope.boards = response.data; // TODO: conform to Parse API
    });
  };

  $scope.isState = function(name) {
    return $state.current.name === name;
  };

  // initialize board
  // $scope.getBoards();
});
