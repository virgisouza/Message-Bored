angular.module('myApp')
.service('messageService', ['$http', function ($http) {
  var url = '/api/messages';
  var urlGet = '/api/messages/latest';
  var self = this;

  self.messages = [];

  //initialization get request for topic data
  $http.get(urlGet)
  .then(function (response) {
    self.messages = response.data;
  })
  .catch(function (err) {
    console.log(err);
  });

  //read method to get All topics
  this.getAllMessages = function () {
    console.log('GET ALL MESSAGES SERVICE: ', self.messages);
    return self.messages;
  };

    //create topic on frontend
  this.addMessage = function (newMessage, id) {
    if(!newMessage){return '404';}
    var message = {
      body : newMessage.body,
      topic_id: id
    };
    return $http.post(url, message)
      .then(function (response) {
        console.log('ADD MESSAGE SERVICE:', response.data);
        self.messages.push(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };


}]);