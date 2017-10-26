angular.module('myApp')
.controller('UsersController', ['$scope','userService',function ($scope,  userService) {

  $scope.userSearch = '';

  $scope.userService = userService;


  $scope.addUser = function (e) {
    userService.addUser($scope.newUser);
    $scope.newUser.username = '';
    $scope.newUser.password = '';

  };

  $scope.login = function (e) {
    userService.login($scope.loginUser);
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';
  };

  $scope.logout = function (e) {
    userService.logout();

  };

}]);