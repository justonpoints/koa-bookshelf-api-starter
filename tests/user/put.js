module.exports = function(assert,request,cookieJar){
    describe('Update User - /user PUT', function(){
        
      it('Update User', function (done) {
        
        //update user
        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"charley"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal(200, res.statusCode);
          assert.equal('{"success":true,"data":{"id":"1","name":"charley"}}', data);
          done();
        });
      });

      it('Is the correct error thrown for a bad parameter?', function (done) {
        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{joe:"charley"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          //assert.equal(400, res.statusCode);
          assert.equal('{"error":{"name":"name required"}}', data);
          done();
        });
      });

      it('Is the correct thrown error for the password being too short?', function (done) {
        //set a bad password
        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"joe",password:"12"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal(200, res.statusCode);
          assert.equal('{"error":{"password":"The password must be at least 5 characters long"}}', data);
          done();
        });
      });
  });
}