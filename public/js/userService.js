angular.module('myApp')
.service('userService', ['$http', function($http) {
  var urlGet = '/api/users';
  var urlPost = '/api/register';
  var urlLogin = '/api/login';
  var urlLogout = '/api/logout';

  var self = this;

  //collection of users
  this.users = [];


  //initialization
  $http.get(urlGet)
    .then(function(response) {
      self.users = response.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  //read methods
  this.getUsers = function() {
    return self.users;
  };

  //create on frontend
  this.addUser = function (givenUser) {
    if(!givenUser) {return '404';}
    var user = {
    username : givenUser.username,
    password : givenUser.password
    };
     // created on backend
    return $http.post(urlPost, user)
    .then(function(response) {
      self.users.push(response.data);
      return response.data;
    });
  };

  //find user by id
  this.getOneUser = function(id) {
   return  $http.get(urlGet + '/' + id)
      .then(function (response) {
        return response.data;

      });
  };

  ///login authenticate
  this.login = function (givenUser) {
    if(!givenUser) {return '404';}
    var user = {
    username : givenUser.username,
    password : givenUser.password
    };
    return $http.post(urlLogin, user)
      .then(function (user) {
        localStorage.setItem('loggedin', true);
        localStorage.setItem('user', user.data.id);
        return user.data;
      });
  };


  //logout
  this.logout = function () {
    return $http.get(urlLogout)
    .then(function (response) {
      localStorage.setItem('loggedin', false);
      localStorage.setItem('user', 0);
      return response.data;
    });
  };


}]);