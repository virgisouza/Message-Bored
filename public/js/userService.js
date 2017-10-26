angular.module('myApp')
.service('userService', ['$http', '$routeParams',function($http) {
  var url = '/api/register';
  var self = this;

  //collection of users
  this.users = [];


  //initialization
  $http.get(url)
    .then(function(response) {
      self.users = response.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  //read methods
  this.getUsers = function() {return self.users; };

  //create on frontend
  this.addUser = function (givenUser) {
    if(!givenUser) {return '404';}
    var user = {
    name : givenUser.name,
    password : givenUser.password
    };
     // created on backend
    return $http.post(url, user)
    .then(function(response) {
      self.users.push(response.data);
      return response.data;
    });
  };

  //find user by id
  this.getOneUser = function(id) {
    // if(!givenUser) {return '404';}
   return  $http.get(url + '/' + id)
      .then(function (data) {
        console.log("GET ONE USER DATA: ", data.data);
        return data.data;

      });
  };


}]);