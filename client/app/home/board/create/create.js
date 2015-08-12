angular.module('artemis.board.create', ['ngFileUpload'])
.controller('CreatePostController', function($scope, $state, Posts, Upload) {
  $scope.create = function() {
    if ($scope.photo || $scope.text) {
      var params = {
        content: $scope.text,
        photo: $scope.photo
      };
      Posts.createPost($scope.boardId, params).then(function(res) { // boardId is from parent scope
        $scope.getPosts(); // invokes getPosts of parent controller
        $state.go('^');
      });
    }
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
