
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

  t.equal(pTable.getPlayers()[JSON.stringify(socket1)].playerId, 1, 'check for correct playerId');
  t.equal(pTable.getPlayers()[JSON.stringify(socket1)].matched, false, 'check for correct matched state');

  t.equal(pTable.getPlayers()[JSON.stringify(socket2)].playerId, 2, 'check for correct playerId');
  t.equal(pTable.getPlayers()[JSON.stringify(socket2)].matched, false, 'check for correct matched state');

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

  t.equal(0, pTable.clear());

  t.end();

});
