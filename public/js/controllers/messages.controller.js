angular.module('myApp')
.controller('MessagesController', ['$scope', '$location', '$routeParams', 'messageService','topicService', function ($scope, $location, $routeParams, messageService, topicService) {

  $scope.topicService = topicService;
  $scope.messageService = messageService;

  $scope.addTopic = function (e) {
    topicService.addTopic($scope.newTopic)
    .then(function () {
      $scope.newTopic.name = '';
      $location.url('/users');
    });
  };


}]);