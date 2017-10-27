angular.module('myApp')
.controller('UsersController', ['$scope', '$location','userService',function ($scope, $location, userService) {

  $scope.userSearch = '';

  $scope.userService = userService;


  $scope.addUser = function (e) {
    userService.addUser($scope.newUser);
    $scope.newUser.username = '';
    $scope.newUser.password = '';

  };

  $scope.login = function (e) {
    userService.login($scope.loginUser)
    .then(function (user) {
      $location.url('/users/' + user.id);
    });
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';

  };

  $scope.logout = function (e) {
    userService.logout();
    $location.url('/users');
  };

}]);