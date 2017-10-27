angular.module('myApp')
.controller('MessagesController', ['$scope', '$location', 'messageService','topicService', function ($scope, $location, messageService, topicService) {

  $scope.topicService = topicService;

  $scope.addTopic = function (e) {
    topicService.addTopic($scope.newTopic)
    .then(function () {
      $scope.newTopic.name = '';
      $location.url('/users');
    });

  };


}]);