angular.module('myApp')
.controller('UsersController', ['$scope', '$location','userService', 'topicService', 'messageService',function ($scope, $location, userService, topicService, messageService) {

  $scope.userSearch = '';

  $scope.userService = userService;

  $scope.topicService = topicService;

  $scope.messageService = messageService;

  $scope.addTopic = function (e) {
    topicService.addTopic($scope.newTopic)
    .then(function () {
      $scope.newTopic.name = '';
      $location.url('/users');
    });
  };

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