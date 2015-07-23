module.exports = function(assert,request,cookieJar){
    describe('Update User - /user PUT', function(){
        
      it('Update [Put] User By Id: /api/user/:id {name:"name"}', function (done) {
        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"charley"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal('{"success":true,"data":{"id":"1","name":"charley"}}', data);
          assert.equal(200, res.statusCode);
          
          //reset user
          request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"one"}}, function (err, res, body){
            var data = JSON.stringify(res.body);
            assert.equal('{"success":true,"data":{"id":"1","name":"one"}}', data);
            assert.equal(200, res.statusCode);
            done();
          });

        });
      });

      it('Update [Put] another User By Id: /api/user/:id {name:"name"}', function (done) {
        request.put({url:'http://localhost:1337/api/user/2', jar: cookieJar, json:{name:"Bucket"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal('{"success":true,"data":{"id":"2","name":"Bucket"}}', data);
          assert.equal(200, res.statusCode);
          
          //reset user
          request.put({url:'http://localhost:1337/api/user/2', jar: cookieJar, json:{name:"two"}}, function (err, res, body){
            var data = JSON.stringify(res.body);
            assert.equal('{"success":true,"data":{"id":"2","name":"two"}}', data);
            assert.equal(200, res.statusCode);
            done();
          });

        });
      });

      it('Update [Put] User: Is the correct error thrown error for the password being too short?', function (done) {
        //set a bad password
        request.put({url:'http://localhost:1337/api/user/1', jar: cookieJar, json:{name:"joe",password:"12"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal('{"error":{"issues":{"password":"The password must be at least 5 characters long"},"message":"Bad Request","code":0}}',data); 
          assert.equal(400, res.statusCode);
          done();
        });
      });
  });
}