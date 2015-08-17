angular.module('artemis.board.create', ['ngFileUpload'])
.controller('CreatePostController', function($scope, $modalInstance, Upload) {
  $scope.disable = false;

  $scope.create = function() {
    var params = {
      content: $scope.text,
      photo: $scope.photo
    };
    $modalInstance.close(params);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.$watch('file', function(file) {
    if (file) {
      $scope.upload($scope.file);
    }
  });

  $scope.upload = function(file) {
    $scope.disable = true;
    Upload.upload({
      url: '/upload',
      file: file
    })
    .success(function(data) {
      $scope.photo = data.url;
      $scope.disable = false;
    });
  };
});
