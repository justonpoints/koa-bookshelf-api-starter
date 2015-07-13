module.exports = function(user){

  var pages = {};

  pages.create = function(data){
    var query = new user().save(data);
    return query;
  };
  
  pages.update = function(data){
    var query = new user({id:data.id}).save(data.update);
    var response = query.then(function(user){
     return {
          success:true,
          data:{
            id:user.attributes.id,
            name:user.attributes.name
          }
        }
    }).catch(function(err){
      return {error:err}
    });
    return response;
  };

  //SReturns the record based on the provided id from the above table.
  pages.selectById = function(id){
      var query = new user({id:id}).fetch();
      var response = query.then(function(user){
        return {
          id:user.attributes.id,
          name:user.attributes.name
        }
      }).catch(function(err){
        if(err = {}){return {error:"No results"}}
        else{return {error:err}}
      });
     return response;
  };

  //used for authentication, Think about moving this to another module.
  pages.selectPass = function(name){
    console.log("here");
    var query = new user({name:name}).fetch();
      var response = query.then(function(user){
        return {
          name:user.attributes.name,
          password:user.attributes.password
        }
      }).catch(function(err){
        return {error:err}
      });
     return response;
  };

  //Deletes the entry from the above table with the provided id.
  pages.delete = function(id){
      var query = new user({id:id}).destroy();
      return query;
  };

  pages.test = function(){
    var query = new user().where({password:"password"}).fetchAll();
    return query;
  }

  return pages;
};