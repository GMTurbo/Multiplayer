
var Table = require("cli-table");
function playerTable(){
    this._list = [];
    /* entries should look like this
    *   _list[JSON.stringify(socket)] = {socket: socket, playerId:int, matched: bool};
    *
    */

    //to the given socket, attach the match token
    this.addMatchToken = function(socket, token){
      var info = this.getSocketInfo(socket);
      if( info && token > 0 && !info.matched){
        info.matchCode = token;
        this.checkForMatch(socket);
        return true;
      }else if (token <= 0){
        console.log("token must be positive value > 0")
      }else if(info.matched){
        console.log("socket is already matched up.  Disconnect first");
      }
      return false;
    };

    //check for an available match, requires the socket,
    //if one is found, it returns the socket to you
    this.checkForMatch = function(socket){
      var info = this.getSocketInfo(socket);
      if(info.matchCode){
        var list = this._list;
        for(var ent in list){
          if(info.playerId !== list[ent].playerId &&
            info.matchCode === list[ent].matchCode){
              list[ent].matched = socket;
              info.matched = list[ent].socket;
              return info.matched;
          }
        }
      }
    };

    this.setScore = function(socket, score){
        var info = this.getSocketInfo(socket);
        if(info){
          info.score = score;
        }
        this._checkForHighScore(score);
        return info.score;
    };

    this.getScore = function(socket){
        var info = this.getSocketInfo(socket);
        if(info){
          return info.score;
        }
        return undefined;
    };

    this.highScoreCallback = null;//expected function(score){..}

    this._checkForHighScore = function(score){
      var list = this._list;
      var max = -1;
      for(var ent in list){
        if(max < list[ent].score){
          max = list[ent].score;
        }
      }
      if(score > max && this.highScoreCallback){
          this.highScoreCallback(score);
      }
    };

    this.clearMatched = function(socket){
      var sockInfo = this.getSocketInfo(socket);
      //removing removed socket,
      //so get his living partner and disconnet first
      var partner = this.getSocketInfo(sockInfo.matched);
      if(!partner)//single player
        return;
      //disconnect
      partner.matched = null;
      //disconnect
      sockInfo.matchCode = -1;
      sockInfo.matched = null;

      return (sockInfo.matched === null && partner.matched===null);
    }

    //search the table for a given player id
    this.containsPlayerId = function(pid){
      var list = this._list;
      for(var ent in list){
        if(list[ent].playerId === pid)
          return true;
      }
      return false;
    };

    this.getPlayers = function(){
        return this._list;
    };

    //get the socket OBJECT associated with a player id
    this.getSocket = function(pid){
      var list = this._list;
      for(var ent in list){
        if(list[ent].playerId === pid)
          return list[ent].socket;
      }
      return undefined;
    };

    this.getSocketInfo = function(socket){
      var sjson = JSON.stringify(socket);
      return this._list[sjson];
    };
    //add an item to the list
    this.addPlayer = function(socket, playerid){
      var sjson = JSON.stringify(socket);
      this._list.push(sjson);
      this._list[sjson] = this._wrapData(socket, playerid, null);
      return this._list.length;
    };

    //add an item to the list
    this.removePlayer = function(socket){
      var sjson = JSON.stringify(socket);
      if(this._list[sjson]){
        this.clearMatched(socket);
        var removed = this._list.splice(sjson,1);
      }
      return this._list.length;
    };
        // wrap the data up for us
    this._wrapData = function(skt, id, mtchd){
      return {
        socket: skt,
        playerId: id,
        matched: mtchd,
        matchCode: -1,
        score: 0
      };
    };

    this.clear = function(){
      this._list = [];
      return this._list.length;
    }

    this.print = function(){
      var table = new Table({
        head: ['player', 'score', 'matchCode', 'matched']
      , colWidths: [15, 15, 15, 15]
      });
    //  console.log(this._list.length);
      // table is an Array, so you can `push`, `unshift`, `splice` and friends
      var list = this._list;
      var count = 1;

      list.forEach(function(ent){
        table.push(
            [count++,list[ent].score, list[ent].matchCode,list[ent].matched ? list[ent].matched : "null"]
        );
      });
      console.log(table.toString());
    }

}

function createTable(){

    return new playerTable();
}

module.exports.createTable = createTable;
