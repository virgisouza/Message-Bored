angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams','topicService', function ($scope, $routeParams, topicService) {

 $scope.topicService = topicService;

 topicService.getOneTopic($routeParams.id)
 .then(function(data) {
    $scope.getOneTopic = data;
  })
 .catch(function (err) {
  console.log(err);
 });


}]);