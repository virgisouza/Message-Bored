angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp')
  .config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl : '/views/users.html',
      controller : 'UsersController'
    })
    .when('/users', {
      templateUrl : '/views/users.html',
      controller : 'UsersController'
    })
    .when('/users/:id', {
      templateUrl : '/views/userId.html',
      controller : 'SingleUserController'
     })
    .when('/login', {
      templateUrl : 'login.html',
      controller : 'UsersController'
    })
    .when('/logout', {
      templateUrl: '/views/users.html',
      controller : 'UsersController'
    })
    .when('/topics/:id', {
      templateUrl : '/views/topicsId.html',
      controller : 'MessagesController'
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
  .run(['$rootScope',function($rootScope) {
      $rootScope.test = new Date();
    }]);