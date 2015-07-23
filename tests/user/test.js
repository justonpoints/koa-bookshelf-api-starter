module.exports = function(assert,request){

describe('/api/user', function () {

  require("./secure")(assert,request);//test that the apis are not reachable without an active session.

  describe('Active Session', function(){
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
        //|log out of the app, destroy session in cookieJar|

        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"one", password:"password"}}, function (err, res, body){
            var data = JSON.stringify(res.body);
            assert.equal(200, res.statusCode);
            assert.equal('{"success":true,"data":{"id":"1","name":"one"}}', data);
          
            request.post({url:'http://localhost:1337/api/logout', jar: cookieJar}, function (err, res, body){     
              request.del({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){
                assert.equal(res.statusCode, 400);
                assert.equal(res.body, '{"error":"no active session"}');
                done();
              });
            });
            
        });
      });

    //test the get request
    require("./get")(assert,request,cookieJar);

    //test the post request
    require("./put")(assert,request,cookieJar);
  });  

});
}