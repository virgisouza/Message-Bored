angular.module('myApp')
.service('userService', ['$http',function($http) {
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

    //update backend with new data
    this.updateUsers = function(id, user) {
    var updateUrl = url + '/' + id;
    $http.put(updateUrl, user);
  };


}]);