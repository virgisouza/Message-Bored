angular.module('myApp')
.controller('SingleUserController', ['$scope', '$routeParams','userService',function ($scope, $routeParams, userService) {

 $scope.userService = userService;

 userService.getOneUser($routeParams.id).then(function(data) {
  console.log('GET ONE USER CONTROLLER', data);
    $scope.getOneUser = data;
  })
 .catch(function (err) {
  console.log(err);
 });


}]);