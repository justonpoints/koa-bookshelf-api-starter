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
      return {error:{issues:err}};
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
        if(err = {}){
          return {error:{code:3}}
        }
        else{
          return {error:{issues:err}};
      }});
     return response;
  };

  //SReturns the record based on the provided id from the above table.
  pages.selectByName = function(name){
      var query = new user({name:name}).fetch();
      var response = query.then(function(user){
        return {
          id:user.attributes.id,
          name:user.attributes.name
        }
      }).catch(function(err){
        if(err = {}){
          return {error:{code:3}}
        }
        else{
          return {error:{issues:err}};
      }});
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