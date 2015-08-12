angular.module('artemis.menu.create', ['ngFileUpload'])
.controller('CreateBoardController', function($scope, $state, $window, Boards, Upload) {
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
      deceasedName: $scope.deceasedName,
      photo: $scope.photo
    };
    Boards.createBoard(params).then(function(res) {
      $state.go('home.board', {id: res.data.objectId});
    });
  };

  $scope.cancel = function() {
    $state.go('^');
  };

  $scope.$watch('file', function(file) {
    $scope.upload($scope.file);
  });

  $scope.upload = function(file) {
    $scope.disable = true;
    Upload.upload({
      url: '/upload',
      file: file
    }).success(function(data) {
      $scope.photo = data.url;
      $scope.disable = false;
    });
  };
});
