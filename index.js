
var randomKeys = require('random-enough');
var redis = require("redis");
var argv = require('minimist')(process.argv.splice(2));

console.dir("commandline args " + argv);

if(argv.port === undefined){argv.port = 8080;}

console.log(argv.port);

var log = argv.save ? 
	require('just-logger').createLogger(argv.save):
	require('just-logger').createLogger(); 

var datastore = redis.createClient();
datastore.on("error", function(err){
	log.error(err);
});
var server = http.createServer(function(request, response){
	log.info("new request");
})

var io = require("socket.io").listen(8080, '0.0.0.0');
io.sockets.on('connection', newConnection);
io.sockets.on('error', function(err){
	log.error(err);
});

var players = [];

var newConnection = function(socket){
	logger.info("new socket connection");
	socket.emit("success", { response : "200"});
	socket.on("requestToken", function(data){
		var key = randomKeys(12);
		socket.emit('newToken', {token: key});
	});
	socket.on("findPlayer", function(data){
		//data = {
		//	playerID : int
		//	}
	});
	socket.on("registerPlayer", function(data){
		// data = {
		// id : created by player
		//	}
		if(data.id){
			players.add({socket:socket, playerId:data.id});
			socket.emit("registerStatus", {response:"ok"});
		}else{
			socket.emit("registerStatus", {response:"error"});	
		}
	});
	socket.on("sendScore", function(data){
		//data = {
		//	player: name, 
		//	score: value
		//	}
	});
};
