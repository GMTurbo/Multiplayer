
function playerTable(){
    this._list = [];
    /* entries should look like this
    *   _list[JSON.stringify(socket)] = {socket: socket, playerId:int, matched: bool};
    *
    */

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
    this.getSocket = function(id){

        var list = this._list;
        for(var ent in list){
          if(list[ent].playerId===id){
            return list[ent].socket;
          }
        }
        return undefined;
    };

    //add an item to the list
    this.addPlayer = function(socket, playerid){
      var sjson = JSON.stringify(socket);
      this._list.push(sjson);
      this._list[sjson] = this._wrapData(socket, playerid, false);
      return this._list.length;
    };

    //add an item to the list
    this.removePlayer = function(socket){
      var sjson = JSON.stringify(socket);
      if(this._list[sjson]){
        this._list.splice(sjson,1)
      }
      return this._list.length;
    };
        // wrap the data up for us
    this._wrapData = function(skt, id, mtchd){
      return {
        socket: skt,
        playerId: id,
        matched: mtchd
      };
    };

    this.clear = function(){
      this._list = [];
      return this._list.length;
    }

}

function createTable(){

    return new playerTable();
}

module.exports.createTable = createTable;
