angular.module('myApp')
.service('topicService', ['$http', function ($http) {
  var urlGet = '/api/topics';
  var urlPost = '/api/topics';

  var self = this;

  //collection of topics
  this.topics = [];

  //initialization get request for topic data
  $http.get(urlGet)
  .then(function (response) {
    console.log('GET TOPIC', response.data);
    self.topics = response.data;
  })
  .catch(function (err) {
    console.log(err);
  });

  //read method to get All topics
  this.getTopics = function () {
    console.log('GET TOPICS SELF.TOPICS', self.topics);
    return self.topics;
  };

  //create topic on frontend
  this.addTopic = function (givenName) {
    if(!givenName){return '404';}
    console.log('ADDTOPIC ROUTE');
    var topic = {
      name : givenName.name
    };

    //link to backend
    return $http.post(urlPost, topic)
      .then(function (response) {
        console.log('POST TOPIC :', response.data);
        self.topics.push(response.data);
        return response.data;
      });
  };

  //GET /:id
  this.getOneTopic = function () {

  };
  //PUT /:id
  this.editTopic = function () {

  };

}]);
