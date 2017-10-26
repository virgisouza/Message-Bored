angular.module('myApp')
.service('userService', ['$http', '$routeParams',function($http) {
  var url = '/api/users';
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
    name : givenUser.name
    };

     // created on backend
    $http.post(url, user)
    .then(function(response) {
      console.log('Book created on backend');
    });

    self.users.push(user);
  };

  //find user by id
  this.getOneUser = function(id) {
    // if(!givenUser) {return '404';}
   return  $http.get(url + '/' + id)
      .then(function (data) {
        console.log("GET ONE USER DATA: ", data.data);
        return data.data;

      });

      // var user = {
      //   name : givenUser.name,
      //   createdAt : givenUser.createdAt
      // };

  };


}]);