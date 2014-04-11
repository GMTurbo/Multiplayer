
function playerTable(){
    this._list = [];
    /* entries should look like this
    *   _list[socket] = {playerId:int, matched: bool};
    *
    */
    
    //search the table for a given player id
    this.containsPlayer = function(pid){
      var list = this._list;
      for(var ent in list){
        if(list[ent].playerId == pid)
          return true;
      }
      return false;
    };
    
    //get the socket associated with a player id
    this.getSocket = function(id){

        var list = this._list;
        for(var ent in list){
          if(list[ent].playerid===id){
            return ent;
          }
        }
        return undefined;
    };
    
    this.Add = function(socket, playerid){
      this._list[socket] = this._wrapData(playerid, false);
    };
    
    this._wrapData = function(id, mtchd){
      return {
        playerId: id,
        matched: mtchd
      };
    };
}

function createTable(){
  
    return new playerTable();
    
}