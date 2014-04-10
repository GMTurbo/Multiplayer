
var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8080';

var options ={
 transports: ['websockets'],
 'force new connection': true
};

/*
emits : registerStatus { response : "ok" || "error" }

*/
it('Should return a success message on connect', function(done){
  var client1 = io.connect(socketURL, options);

  client1.on('connect', function(data){
    client1.emit('connection name', chatUser1);

    /* Since first client is connected, we connect
    the second client. */
    var client2 = io.connect(socketURL, options);

    client2.on('connect', function(data){
      client2.emit('connection name', chatUser2);
    });

    client2.on('new user', function(usersName){
      usersName.should.equal(chatUser2.name + " has joined.");
      client2.disconnect();
    });

  });
});