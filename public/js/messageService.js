angular.module('myApp')
.service('messageService', ['$http', function ($http) {
  var url = '/api/messages';
  var urlGet = '/api/messages/latest';
  var self = this;

  self.messages = [];

    //initialization
  $http.get(urlGet)
    .then(function(response) {
      self.messages = response.data;
    })
    .catch(function (err) {
      console.log(err);
    });

    //create topic on frontend
  this.addMessage = function (newMessage, id) {
    if(!newMessage){return '404';}
    var message = {
      body : newMessage.body,
      topic_id: id
    };

    //link to backend
    return $http.post(url, message)
      .then(function (response) {
        console.log('ADD MESSAGE SERVICE:', response.data);
        self.messages.push(response.data);
        return response.data;
      });
  };


}]);