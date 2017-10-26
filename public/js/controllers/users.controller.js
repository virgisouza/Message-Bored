angular.module('myApp')
.controller('UsersController', ['$scope', 'userService',function ($scope, userService) {

  $scope.userSearch = '';

  $scope.userService = userService;

  $scope.newUser = {
    name : '',
    createdAt : '',
    updatedAt: ''
  };

  $scope.addUser = function (e) {
    userService.addUser($scope.newUser);
    $scope.newUser.name = '';
    $scope.newUser.createdAt = '';
    $scope.newUser.updatedAt = '';
  };

}]);