angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams','topicService', function ($scope, $routeParams, topicService) {

 $scope.topicService = topicService;

 topicService.getOneTopic($routeParams.id)
 .then(function(data) {
  console.log('SINGLE TOPIC SCOPE DATA', data);
    $scope.getOneTopic = data;
  })
 .catch(function (err) {
  console.log(err);
 });


}]);