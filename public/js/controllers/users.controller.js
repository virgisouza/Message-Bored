angular.module('myApp')
.controller('UsersController', ['$scope', '$routeParams','userService',function ($scope, $routeParams, userService) {

  $scope.userSearch = '';

  $scope.userService = userService;


  $scope.addUser = function (e) {
    userService.addUser($scope.newUser);
    $scope.newUser.name = '';
    $scope.newUser.createdAt = '';
    $scope.newUser.updatedAt = '';
  };

}]);