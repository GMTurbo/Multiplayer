
var should = require('should');

// var io = require('socket.io-client');
//
// var socketURL = 'http://0.0.0.0:8080';
//
// var options ={
//  transports: ['websockets'],
//  'force new connection': true
// };

/*
emits : registerStatus { response : "ok" || "error" }

*/

// it('Should return a success message on connect', function(done){
//   var client1 = io.connect(socketURL, options);
//
//   client1.on('connect', function(data){
//     client1.emit('connection name', chatUser1);
//
//     /* Since first client is connected, we connect
//     the second client. */
//     var client2 = io.connect(socketURL, options);
//
//     client2.on('connect', function(data){
//       client2.emit('connection name', chatUser2);
//     });
//
//     client2.on('new user', function(usersName){
//       usersName.should.equal(chatUser2.name + " has joined.");
//       client2.disconnect();
//     });
//
//   });
// });

console.log("***************** TESTING PLAYERTABLE OBJ ******************");

var test = require('tape');
var pTable = require("../playerTable.js").createTable();

var socket1 = new Object({name:'socket1'});
var socket2 = new Object({name:'socket2'});
var socket3 = new Object({name:'socket3'});
var socket4 = new Object({name:'socket4'});
var socket5 = new Object({name:'socket5'});
var socket6 = new Object({name:'socket6'});

test('playerTable insert and delete', function(t){

  t.equal(1, pTable.addPlayer(socket1, 1), 'insert 1');
  t.equal(2, pTable.addPlayer(socket2, 2), 'insert 2');
  t.equal(3, pTable.addPlayer(socket3, 3), 'insert 3');

  t.equal(3, pTable.removePlayer("fdaf"), 'remove non-existant');

  t.equal(2, pTable.removePlayer(socket3), 'remove 1');
  t.equal(1, pTable.removePlayer(socket2), 'remove 2');
  t.equal(0, pTable.removePlayer(socket1), 'remove 3');

  t.end();

});

test('playerTable insert and check', function(t){

  t.equal(1, pTable.addPlayer(socket1, 1), 'insert 1');
  t.equal(2, pTable.addPlayer(socket2, 2), 'insert 2');
  t.equal(3, pTable.addPlayer(socket3, 3), 'insert 3');

  t.equal(0, pTable.clear(), "clear table test");

  t.end();

});

test('playerTable getSocket check', function(t){

  t.equal(1, pTable.addPlayer(socket1, 1), 'insert 1');
  t.equal(2, pTable.addPlayer(socket2, 2), 'insert 2');
  t.equal(3, pTable.addPlayer(socket3, 3), 'insert 3');

  t.notEqual(undefined, pTable.getSocket(1), "check getSocket doesn't return undefined for p1");
  t.notEqual(undefined, pTable.getSocket(2), "check getSocket doesn't return undefined for p2");
  t.notEqual(undefined, pTable.getSocket(3), "check getSocket doesn't return undefined for p3");

  t.equal(socket1, pTable.getSocket(1), 'check getSocket(1) returns the original socket1 obj');
  t.equal(socket2, pTable.getSocket(2), 'check getSocket(2) returns the original socket2 obj');
  t.equal(socket3, pTable.getSocket(3), 'check getSocket(3) returns the original socket3 obj');

  t.notEqual(socket2, pTable.getSocket(1), 'check getSocket(1) doesnt return the different socket');
  t.notEqual(socket3, pTable.getSocket(2), 'check getSocket(2) doesnt return the different socket');
  t.notEqual(socket1, pTable.getSocket(3), 'check getSocket(3) doesnt return the different socket');

  t.equal(0, pTable.clear(), "clear table test");

  t.end();

});



test('playerTable containsPlayer check', function(t){

  t.equal(1, pTable.addPlayer(socket1, 1), 'insert player1');
  t.equal(true, pTable.containsPlayerId(1), 'check for player 1');
  t.equal(2, pTable.addPlayer(socket2, 2), 'insert player2');
  t.equal(true, pTable.containsPlayerId(2), 'check for player 2');
  t.equal(3, pTable.addPlayer(socket3, 3), 'insert player3');
  t.equal(true, pTable.containsPlayerId(3), 'check for player 3');
  t.equal(4, pTable.addPlayer(socket4, 4), 'insert player4');
  t.equal(true, pTable.containsPlayerId(4), 'check for player 4');
  t.equal(5, pTable.addPlayer(socket5, 5), 'insert player5');
  t.equal(true, pTable.containsPlayerId(5), 'check for player 5');
  t.equal(6, pTable.addPlayer(socket6, 6), 'insert player6');
  t.equal(true, pTable.containsPlayerId(6), 'check for player 6');

  t.equal(true, pTable.containsPlayerId(1), 'check for player 1');
  t.equal(true, pTable.containsPlayerId(2), 'check for player 2');
  t.equal(true, pTable.containsPlayerId(3), 'check for player 3');
  t.equal(true, pTable.containsPlayerId(4), 'check for player 4');
  t.equal(true, pTable.containsPlayerId(5), 'check for player 5');
  t.equal(true, pTable.containsPlayerId(6), 'check for player 6');

  t.notEqual(true, pTable.containsPlayerId(40), 'check for player 40 (doesnt exist)');
  t.notEqual(true, pTable.containsPlayerId(50), 'check for player 50 (doesnt exist)');
  t.notEqual(true, pTable.containsPlayerId(60), 'check for player 60 (doesnt exist)');

  t.equal(0, pTable.clear(), "clear table test");
  t.end();
});

test('playerTable matching check', function(t){

  t.equal(1, pTable.addPlayer(socket1, 1), 'insert player1');
  t.equal(2, pTable.addPlayer(socket2, 2), 'insert player2');
  t.equal(3, pTable.addPlayer(socket3, 3), 'insert player3');
  t.equal(4, pTable.addPlayer(socket4, 4), 'insert player1');
  t.equal(5, pTable.addPlayer(socket5, 5), 'insert player2');
  t.equal(6, pTable.addPlayer(socket6, 6), 'insert player3');

  t.equal(true, pTable.addMatchToken(socket1, 10), 'add token to player on socket1');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket2, 20), 'add token to player on socket2');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket3, 30), 'add token to player on socket3');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket4, 40), 'add token to player on socket4');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket5, 50), 'add token to player on socket5');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket6, 60), 'add token to player on socket6');
  pTable.print();

  t.equal(true, pTable.addMatchToken(socket4, 10), 'matching 4->1');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket5, 20), 'matching 5->2');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket6, 30), 'matching 6->3');
  pTable.print();

  t.equal(false, pTable.addMatchToken(socket4, 20), 'reset token of player 4 to match player 1');
  pTable.print();
  t.equal(false, pTable.addMatchToken(socket5, 30), 'reset token of player 5 to match player 2');
  pTable.print();
  t.equal(false, pTable.addMatchToken(socket6, 10), 'reset token of player 6 to match player 3');
  pTable.print();

  t.equal(true, pTable.clearMatched(socket4), 'disconnecting from partner: 4->1');
  pTable.print();
  t.equal(true, pTable.clearMatched(socket5), 'disconnecting from partner: 5->2');
  pTable.print();
  t.equal(true, pTable.clearMatched(socket6), 'disconnecting from partner: 6->3');
  pTable.print();

  t.equal(true, pTable.addMatchToken(socket4, 20), 'matching 4->2');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket5, 30), 'matching 5->3');
  pTable.print();
  t.equal(true, pTable.addMatchToken(socket6, 10), 'matching 6->1');
  pTable.print();

  t.equal(5, pTable.removePlayer(socket1), 'remove player1');
  pTable.print();
  t.equal(4, pTable.removePlayer(socket2), 'remove player2');
  pTable.print();
  t.equal(3, pTable.removePlayer(socket3), 'remove player3');
  pTable.print();
  t.equal(2, pTable.removePlayer(socket4), 'remove player4');
  pTable.print();
  t.equal(1, pTable.removePlayer(socket5), 'remove player5');
  pTable.print();
  t.equal(0, pTable.removePlayer(socket6), 'remove player6');
  pTable.print();

  t.equal(0, pTable.clear(), "clear table test");
  t.end();
});
