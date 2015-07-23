module.exports = function(auth){

  var pages = {};

  //used for authentication, Think about moving this to another module.
  pages.validatePass = function(validate){
    var query = new auth(validate).fetch();
    var response = query.then(function(user){
        return {
          id:user.attributes.id,
          name:user.attributes.name,
          type:user.attributes.type,
          password:user.attributes.password
        }
      }).catch(function(err){
        if(err = {}){return {error:{code:2}}}
        else{return {error:err}}
      });
     return response;
  };

  return pages;
};