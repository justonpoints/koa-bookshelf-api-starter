module.exports = function(auth){

  var pages = {};

  //used for authentication, Think about moving this to another module.
  pages.validatePass = function(validate){
    console.log("here");
    var query = new auth(validate).fetch();
    var response = query.then(function(user){
        return {
          id:user.attributes.id,
          name:user.attributes.name,
          password:user.attributes.password
        }
      }).catch(function(err){
        if(err = {}){return {message:"Bad Credentials"}}
        else{return {error:err}}
      });
     return response;
  };

  return pages;
};