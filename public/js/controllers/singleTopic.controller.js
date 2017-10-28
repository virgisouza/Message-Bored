angular.module('myApp')
.controller('SingleTopicController', ['$scope', '$routeParams', '$location','topicService', 'messageService', function ($scope, $routeParams, $location, topicService, messageService) {

 $scope.topicService = topicService;
 $scope.messageService = messageService;


 if($routeParams.id) {
 topicService.getOneTopic($routeParams.id)
 .then(function(data) {
    $scope.getOneTopic = data;
  })
 .catch(function (err) {
  console.log(err);
 });
}

  if($routeParams.id) {
    topicService.getMessageByTopic($routeParams.id)
    .then( function (data) {
      $scope.getMessageByTopic = data;
    })
    .catch(function (err) {
      console.log(err);
   });
  }

 $scope.addMessage = function (e) {
  messageService.addMessage($scope.newMessage, $scope.getOneTopic.id)
  .then(function (data) {
    $scope.newMessage.body = '';
    $location.url('/');
  });
};



}]);