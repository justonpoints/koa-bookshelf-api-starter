module.exports = function(assert,request){

describe('/api/user', function () {

  var cookieJar = request.jar();//for storing session data.
  
 //test the get request
  require("./login")(assert,request,cookieJar);

  //test the post request
  require("./secure")(assert,request);

});
}