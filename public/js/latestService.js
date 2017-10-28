angular.module('myApp')
.service('latestService', ['$http', function($http) {
  var url = '/api/latest';
  var self = this;

  //collection of topics
  this.latest = [];

  //initialization get request for topic data
  $http.get(url)
  .then(function (response) {
    self.latest = response.data;
  })
  .catch(function (err) {
    console.log(err);
  });

  //read method to get All topics
  this.getAllMessages = function () {
    console.log('GET ALL MESSAGES SERVICE: ',self.latest);
    return self.latest;
  };

  // //create topic on frontend
  // this.addMessage = function (newMessage) {
  //   if(!newMessage){return '404';}
  //   var message = {
  //     body : newMessage.body
  //   };

  //   //link to backend
  //   return $http.post(url, message)
  //     .then(function (response) {
  //       console.log('ADD MESSAGE SERVICE:', response.data);
  //       self.latest.push(response.data);
  //       return response.data;
  //     });
  // };

}]);
