
var randomKeys = require('random-enough');
var playerTable = require('./playerTable.js').createTable();
//var redis = require("redis");
var argv = require('minimist')(process.argv.splice(2));

console.dir("commandline args " + argv);

if(argv.port === undefined){argv.port = 8080;}

console.log(argv.port);

var log = argv.save ?
	require('just-logger').createLogger(argv.save):
	require('just-logger').createLogger();

// var datastore = redis.createClient();
// datastore.on("error", function(err){
// 	log.error(err);
// });


var newConnection = function(socket){

	log.info("new socket connection");

	playerTable.addPlayer(socket);

	playerTable.highScoreCallback = function(score){
		socket.emit('highScore', score);
	};

	socket.emit('connected', { response : 200 });

	socket.on('requestToken', function(data){
		var key = randomKeys(12);
		socket.emit('newToken', {token: key});
	});

	socket.on('findPlayer', function(data){
		//data = {
		//	playerID : int
		//	}

		var found = playerTable.containsPlayer(data.playerID);
		socket.emit('playerFound', {playerId: data.playerID, playerFound: found});

	});

	socket.on('registerPlayer', function(data){
		// data = {
		// id : created by player
		//	}
		if(data.id){
			playerTable.Add(socket, data.id);
			socket.emit('registerStatus', {response:"ok"});
		}else{
			socket.emit('registerStatus', {response:"error"});
		}
	});

	socket.on('sendScore', function(data){
		//data = {
		//	score: value
		//	}
		console.log("score updating");
		playerTable.setScore(socket, data.score);
		playerTable.print();
	});

	socket.on('disconnect', function(){
		playerTable.removePlayer(socket);
		log.info("player disconnected");
	})
};

var io = require('socket.io').listen(argv.port, '0.0.0.0');

io.sockets.on('connection', newConnection);

io.sockets.on('error', function(err){
	log.error(err);
});
