angular.module('myApp')
.controller('ViewsController', ['$scope', function ($scope) {

  $scope.login = function (e) {
    return localStorage.getItem('loggedin') === 'true';
  };
}]);
