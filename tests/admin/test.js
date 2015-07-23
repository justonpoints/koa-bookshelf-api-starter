module.exports = function(assert,request){

describe('Admin User - /api/user', function () {

      var cookieJar = request.jar();
      
      before(function(done){
        //login to the app, save session into cookieJar
          request.post({url:'http://localhost:1337/api/login?username=one&password=password', jar: cookieJar}, function (err, res, body){     
              request.del({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){
                assert.equal(res.statusCode, 200);
                assert.equal(res.body, '{"success":"You are logged in"}');
                done();
            });
          });
      });

      after(function(done){
        //reset the database. 
            request.post({url:'http://localhost:1337/api/logout', jar: cookieJar}, function (err, res, body){     
              request.del({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){
                assert.equal(res.statusCode, 401);
                assert.equal(res.body, '{"error":{"code":1,"message":"No Active Session"}}');
                done();
              });
            });
      });

    //test the get request
    require("./get")(assert,request,cookieJar);

    //test the post request
    require("./put")(assert,request,cookieJar);
  });  
}