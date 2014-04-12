

var test = require('tape');

var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8080';

var options ={
 transports: ['websockets'],
 'force new connection': true
};

// test("test socket connect and disconnect tests", function(t){
// //socket.emit('my other event', { my: 'data' });
//
//   var connected = function(socket){
//     return function(data){
//       t.equal(data.response, 200, "expect a return response of 200");
//       socket.disconnect();
//     };
//   };
//
//   var client1 = io.connect(socketURL, options);
//   var client2 = io.connect(socketURL, options);
//   var client3 = io.connect(socketURL, options);
//   var client4 = io.connect(socketURL, options);
//   var client5 = io.connect(socketURL, options);
//   var client6 = io.connect(socketURL, options);
//
//   client1.on('connected', connected(client1));
//   client2.on('connected', connected(client2));
//   client3.on('connected', connected(client3));
//   client4.on('connected', connected(client4));
//   client5.on('connected', connected(client5));
//   client6.on('connected', connected(client6));
//
//   t.end();
//
// });

test("test socket set && get scores tests", function(t){
//socket.emit('my other event', { my: 'data' });

  // var highScore = function(expected){
  //   return function(score){
  //     t.equal(score, expected, "expect a return score of " + expected);
  //   };
  // };

  var highScore = function(score){
    console.log("new high score! " + score);
  };

  var client1 = io.connect(socketURL, options);
  var client2 = io.connect(socketURL, options);
  var client3 = io.connect(socketURL, options);
  var client4 = io.connect(socketURL, options);
  var client5 = io.connect(socketURL, options);
  var client6 = io.connect(socketURL, options);

  client1.on('connected', function(){
    client1.on('highScore', highScore(10));
    client1.emit('sendScore', {score:10});
  });

  client2.on('connected', function(){
    client2.on('highScore', highScore(20));
    client2.emit('sendScore', {score:20});
  });

  client3.on('connected', function(){
    client3.on('highScore', highScore(30));
    client3.emit('sendScore', {score:30});
  });

  client4.on('connected', function(){
    client4.on('highScore', highScore(40));
    client4.emit('sendScore', {score:40});
  });

  client5.on('connected', function(){
    client5.on('highScore', highScore(50));
    client5.emit('sendScore', {score:50});
  });

  client6.on('connected', function(){
    client6.on('highScore', highScore(60));
    client6.emit('sendScore', {score:60});
  });
  // client1.on('connected', function(){
  //   client1.on('highScore', highScore(10));
  //   client1.emit('sendScore', {score:10});
  // });
  //
  // client1.on('connected', function(){
  //   client1.on('highScore', highScore(10));
  //   client1.emit('sendScore', {score:10});
  // });

  // client2.on('highScore', highScore(20));
  // client2.emit('sendScore', {score:20});
  //
  // client3.on('highScore', highScore(30));
  // client3.emit('sendScore', {score:30});
  //
  // client4.on('highScore', highScore(40));
  // client4.emit('sendScore', {score:40});
  //
  // client5.on('highScore', highScore(50));
  // client5.emit('sendScore', {score:50});
  //
  // client6.on('highScore', highScore(60));
  // client6.emit('sendScore', {score:60});

  setTimeout(function(){
    t.end();
  }, 5000);
  //t.end();

});
//
// /*
// emits : registerStatus { response : "ok" || "error" }
//
// */
//
// it('Should return a success message on connect', function(done){
//   var client1 = io.connect(socketURL, options);
//
//   client1.on('connect', function(data){
//     console.dir(data);
//     // client1.emit('connection name', chatUser1);
//     //
//     // /* Since first client is connected, we connect
//     // the second client. */
//     // var client2 = io.connect(socketURL, options);
//     //
//     // client2.on('connect', function(data){
//     //   client2.emit('connection name', chatUser2);
//     // });
//     //
//     // client2.on('new user', function(usersName){
//     //   usersName.should.equal(chatUser2.name + " has joined.");
//     //   client2.disconnect();
//     // });
//
//   });
// });
