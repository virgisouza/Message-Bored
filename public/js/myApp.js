angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp')
  .config(['UsersProvider', 'TopicsProvider', 'MessagesProvider', '$routeProvider', '$locationProvider', function(UsersProvider, TopicsProvider, MessagesProvider, $routeProvider, $locationProvider) {

    UsersProvider.setUrl('http://localhost:3000/api/users');
    TopicsProvider.setUrl('http://localhost:3000/api/topics');
    MessagesProvider.setUrl('http://localhost:3000/api/messages');



    $routeProvider
    .when('/', {
      templateUrl : '/views/users.html',
      controller : 'UsersController'
    })
    .when('/latest', {
      templateUrl : '/views/latest.html',
      controller : 'LatestController'
    })
    .otherwise({
      template : '<h1><center>404 PAGE HERE</center></h1>'
    });

    $locationProvider.html5Mode(true);
  }])
  .run('$rootScope',function($rootScope) {
    $rootScope.test = new Date();
  });