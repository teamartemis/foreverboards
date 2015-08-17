angular.module('artemis.menu.create', ['ngFileUpload'])
.controller('CreateBoardController', function($scope, $state, $modalInstance, Boards, Upload) {
  $scope.disable = true;

  $scope.create = function() {
    if (!$scope.deceasedName) {
      // TODO: display error message
      return console.log('Cannot create board with empty name');
    }

    var params = {
      deceasedName: $scope.deceasedName,
      photo: $scope.photo
    };
    $modalInstance.close(params);
  };

  $scope.cancel = function() {
    // $state.go('^');
    $modalInstance.dismiss('cancel');
  };

  $scope.$watch('file', function() {
    if ($scope.file) {
      $scope.upload($scope.file);
    }
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
