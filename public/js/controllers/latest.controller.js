angular.module('myApp')
.controller('LatestController', ['$scope', '$location', '$routeParams','latestService', 'messageService', function ($scope, $location, $routeParams, latestService, messageService) {

  $scope.latestService = latestService;
//   $scope.messageService = messageService;

//   $scope.addMessage = function (e) {
//   messageService.addMessage($scope.newMessage, $scope.getOneTopic.id)
//   .then(function (data) {
//     $scope.newMessage.body = '';
//   });
// };


}]);