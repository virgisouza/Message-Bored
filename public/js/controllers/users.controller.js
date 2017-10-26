angular.module('myApp')
.controller('UsersController', ['$scope', '$routeParams','userService',function ($scope, $routeParams, userService) {

  $scope.userSearch = '';

  $scope.userService = userService;

  $scope.newUser = {
    name : '',
    createdAt : '',
    updatedAt: ''
  };

  $scope.oneUser = {
    name : '',
    createdAt : ''
  };

 userService.getOneUser($routeParams.id).then(function(data) {
    $scope.getOneUser = data;
  });

  $scope.addUser = function (e) {
    userService.addUser($scope.newUser);
    $scope.newUser.name = '';
    $scope.newUser.createdAt = '';
    $scope.newUser.updatedAt = '';
  };

  // $scope.getOneUser = function (e) {
  //   console.log('getOne');
  //   userService.getOneUser($scope.oneUser);
  //   $scope.oneUser.name = '';
  //   $scope.oneUser.createdAt = '';
  // };

}]);