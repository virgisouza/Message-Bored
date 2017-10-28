angular.module('myApp')
.service('topicService', ['$http', function ($http) {
  var url = '/api/topics';
  var self = this;

  //collection of topics
  this.topics = [];

  //initialization get request for topic data
  $http.get(url)
  .then(function (response) {
    self.topics = response.data;
  })
  .catch(function (err) {
    console.log(err);
  });

  //read method to get All topics
  this.getTopics = function () {
    return self.topics;
  };

  //create topic on frontend
  this.addTopic = function (givenName) {
    if(!givenName){return '404';}
    var topic = {
      name : givenName.name
    };

    //link to backend
    return $http.post(url, topic)
      .then(function (response) {
        self.topics.push(response.data);
        return response.data;
      });
  };

  //GET /:id
  this.getOneTopic = function (id) {
   return  $http.get(url + '/' + id)
      .then(function (response) {
        console.log('GET ONE TOPIC SERVICE', response.data);
        return response.data;

      });
  };

  /// /api/topics/:id/messages
  this.getMessageByTopic = function (id) {
    return $http.get(url + '/' + id + '/messages')
      .then(function (messages) {
        console.log('GET ONE TOPIC WITH MESSAGES SERVICE', messages.data.result);
        return messages.data.result;

      });
  };

  //PUT /:id
  this.editTopic = function () {

  };

}]);
